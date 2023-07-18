import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import eventsource from "react-native-sse";

import { Provider as PaperProvider } from "react-native-paper";

import MainNavigator from "./navigators/MainNavigator";
import AuthScreen from "./screens/AuthScreen";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./constants/theme";

import useNetwork from "./hooks/useNetwork";
import useAuth from "./hooks/useAuth";
import useToken from "./hooks/useToken";
import { ToastAndroid } from "react-native";

global.EventSource = eventsource;

import notifee, { AuthorizationStatus, EventType } from "@notifee/react-native";
import axios from "axios";


export default function App() {

  const NANO_ID = process.env.ARDUINO_NANO_ID;
  const MED_PID = "59cdb8d0-6423-4f3a-9fc6-2b1f4d9bb60d"

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const isConnected = useNetwork();
  const { isLoggedIn } = useAuth();

  const theme = isDarkTheme? CombinedDarkTheme : CombinedDefaultTheme;

  const { token, error, isMutating } = useToken();

  if (error) {
    alert("Error getting token");
    console.log(error);
  }

  if (isMutating) {
    console.log("Refreshing token");
  }

  if (token) {
    save("token", token) 
  }

  // set background notifications to appear even when app is closed
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === "send-reminder") {
      const {medName} = detail.notification.data;
      // send reminder with med name to the smart band 
      await axios.put(`https://api2.arduino.cc/iot/v2/things/${NANO_ID}/properties/${MED_PID}/publish`,{
        "value": medName
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(() => {
        console.log("Reminder sent!")
        ToastAndroid.show("Reminder sent!", ToastAndroid.SHORT);
      }
      ).catch((error) => {
        console.log(error);
        ToastAndroid.show("Error sending reminder", ToastAndroid.SHORT);
      }
      )
      
    } 
  });

  useEffect(() => {
    requestNotificationPermissions();
  }, [])
  

  return (
    <>
      <StatusBar style={isDarkTheme ? "light" : "dark"} />

      <PaperProvider theme={theme}>
        {isLoggedIn && isConnected ? (
          <MainNavigator theme={theme} setIsDarkTheme={setIsDarkTheme} />
        ) : (
          <AuthScreen isConnected={isConnected} />
        )}
      </PaperProvider>
    </>
  );
}


async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  console.log("APP.JS: Token secured!")
}

async function requestNotificationPermissions() {

  try {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      alert(
        "The app won't be able to send notifications. Consider granting permission in the settings"
      );
    } else if (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
    ) {
      console.log("User granted notification permissions");
    }
  } catch (e) {
    console.log("Error requesting permissions: ", e);
  }
}