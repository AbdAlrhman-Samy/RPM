import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientScreen from "../screens/PatientScreen";
import VitalDetailsScreen from "../screens/VitalDetailsScreen";

const Stack = createNativeStackNavigator();


export default function PatientStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Patient Status Overview" component={PatientScreen} />
      <Stack.Screen name="Patient Vital Details" component={VitalDetailsScreen} />
    </Stack.Navigator>
  )
}