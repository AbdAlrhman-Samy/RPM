import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { Provider as PaperProvider } from "react-native-paper";

import MainNavigator from "./navigators/MainNavigator";
import AuthScreen from "./screens/AuthScreen";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./constants/theme";

import useNetwork from "./hooks/useNetwork";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const isConnected = useNetwork();

  const theme = isDarkTheme? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <>
      <StatusBar style={isDarkTheme ? "light" : "dark"} />

      <PaperProvider theme={theme}>
        {isLoggedIn && isConnected ? (
          <MainNavigator theme={theme} setIsDarkTheme={setIsDarkTheme} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <AuthScreen setIsLoggedIn={setIsLoggedIn} isConnected={isConnected} />
        )}
      </PaperProvider>
    </>
  );
}
