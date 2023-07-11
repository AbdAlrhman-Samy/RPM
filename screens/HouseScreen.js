import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import Widget from "../components/Widget";
import HouseHeader from "../components/HouseHeader";
import HouseControls from "../components/HouseControls";
import HouseStatus from "../components/HouseStatus";

export default function HouseScreen() {
  return (
    <View style={styles.container}>
      <HouseHeader />

      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          Fire Detection
        </Text>

        <HouseStatus />
        <HouseControls />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  content: {
    flex: 1,
    padding: 8,
    height: "100%",
    marginBottom: 8,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
