import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PatientScreen from "../screens/PatientScreen";
import HouseScreen from "../screens/HouseScreen";
import { CommonActions } from "@react-navigation/native";
import { BottomNavigation, Button, useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ setIsDarkTheme }) {

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Patient"
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: null,
        headerRight: () => {
          return (
            <Button
              icon="theme-light-dark"
              onPress={() => {
                setIsDarkTheme((isDarkTheme) => !isDarkTheme);
              }}
              compact
            />
          );
        },
        headerStyle: {
          backgroundColor: colors.elevation.level2,
          elevation: 0,
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}>

      <Tab.Screen
        name="Patient"
        component={PatientScreen}
        options={{
          tabBarLabel: "Patient",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="House"
        component={HouseScreen}
        options={{
          tabBarLabel: "House",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          }
        }}
      />

    </Tab.Navigator>
  );
}
