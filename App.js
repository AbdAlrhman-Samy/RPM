import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import eventsource from "react-native-sse";

import { Provider as PaperProvider } from "react-native-paper";

import MainNavigator from "./navigators/MainNavigator";
import AuthScreen from "./screens/AuthScreen";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./constants/theme";

import useNetwork from "./hooks/useNetwork";
import useAuth from "./hooks/useAuth";

global.EventSource = eventsource;

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const isConnected = useNetwork();
  const { isLoggedIn } = useAuth();

  const theme = isDarkTheme? CombinedDarkTheme : CombinedDefaultTheme;

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
