import { StyleSheet, View } from "react-native";
import Gauge from "./Gauge";

export default function HouseStatus() {
  return (
    <View style={styles.container}>
      <Gauge
            max={80}
            value={25}
            title="Temperature"
            icon={{ name: "thermometer", color: "orangered" }}
            unit="°C"
          />

          <Gauge
            title="Gas Level"
            icon={{ name: "gas-cylinder", color: "cadetblue" }}
            max={100}
            value={80}
            unit="PPM"
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
