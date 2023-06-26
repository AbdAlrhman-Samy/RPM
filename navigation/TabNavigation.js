import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Icon } from "@rneui/themed";
import { useState } from "react";
import HouseScreen from "../screens/HouseScreen";
import PatientScreen from "../screens/PatientScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation({ setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <Button
            title="Log Out"
            onPress={handleLogout}
            loading={isLoading}
            size="sm"
            type="outline"
            color="secondary"
            radius={10}
            containerStyle={{ marginRight: 10 }}
          />
        ),
      }}>
      <Tab.Screen
        name="Patient"
        component={PatientScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="House" component={HouseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
