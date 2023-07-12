import { StyleSheet, View } from "react-native";
import HouseHeader from "../components/HouseHeader";
import HouseControls from "../components/HouseControls";
import Gauge from "../components/Gauge";
import HouseStatus from "../components/HouseStatus";

export default function HouseScreen() {
  return (
    <View style={styles.container}>
      <HouseHeader />

      <View style={styles.content}>
        <HouseControls />
        <HouseStatus />
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
    padding: 16,
    marginVertical: 16,
    alignContent: "center",
    justifyContent: "center",
    gap: 8,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
