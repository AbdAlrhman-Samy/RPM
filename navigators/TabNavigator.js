import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PatientScreen from "../screens/PatientScreen";
import HouseScreen from "../screens/HouseScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Patient" component={PatientScreen} />
      <Tab.Screen name="House" component={HouseScreen} />
    </Tab.Navigator>
  )
}