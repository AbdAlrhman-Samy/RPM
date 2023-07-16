import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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

export default function App() {
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
    ToastAndroid.show("Refreshing token", ToastAndroid.SHORT);
  }

  if (token) {
    save("token", token) 
  }


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

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}