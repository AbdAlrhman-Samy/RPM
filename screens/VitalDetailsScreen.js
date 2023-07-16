import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import VitalChart from "../components/VitalChart";

export default function VitalDetailsScreen({ route }) {
  const { vital } = route.params;

  return (
    <View>
      <Text variant="displaySmall" style={styles.title}>
        {vital} History
      </Text>

      <VitalChart vital={vital} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 64,
  },
});
