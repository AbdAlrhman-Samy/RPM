import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientScreen from "../screens/PatientScreen";
import VitalDetailsScreen from "../screens/VitalDetailsScreen";
import MedsScreen from "../screens/MedsScreen";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();


export default function PatientStackNavigator() {

  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Patient Status Overview"
      screenOptions={{
        animation: "slide_from_right",
        headerStyle: {
          backgroundColor: colors.elevation.level2,
        },
      }}
    >
      <Stack.Screen 
        name="Patient Status Overview" 
        component={PatientScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Patient Vital Details" component={VitalDetailsScreen}

      />

      <Stack.Screen name="Medication Details" component={MedsScreen} />
    </Stack.Navigator>
  )
}