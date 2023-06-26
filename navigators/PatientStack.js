import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientScreen from "../screens/PatientScreen";
import VitalsScreen from "../screens/VitalsScreen";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function PatientStack() {

  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Patient"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="Patient" component={PatientScreen} />
      <Stack.Screen name="Vitals" component={VitalsScreen} />
    </Stack.Navigator>
  )
}