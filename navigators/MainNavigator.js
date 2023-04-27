import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";


export default function MainNavigator({ theme, setIsDarkTheme }) {
  return (
    <NavigationContainer theme={theme} >
      <TabNavigator setIsDarkTheme={setIsDarkTheme} />
    </NavigationContainer>
  )
}