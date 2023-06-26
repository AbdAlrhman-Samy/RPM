import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";


export default function MainNavigator({ theme, setIsDarkTheme, setIsLoggedIn }) {
  return (
    <NavigationContainer theme={theme} >
      <TabNavigator setIsDarkTheme={setIsDarkTheme} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  )
}