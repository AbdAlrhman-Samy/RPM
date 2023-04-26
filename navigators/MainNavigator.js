import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";


export default function MainNavigator({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <TabNavigator />
    </NavigationContainer>
  )
}