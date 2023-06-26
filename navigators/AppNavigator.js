import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";


export default function AppNavigator({ theme, setIsLoggedIn }) {
  return (
    <NavigationContainer theme={theme} >
      <TabNavigator setIsLoggedIn={setIsLoggedIn}/>
    </NavigationContainer>
  )
}