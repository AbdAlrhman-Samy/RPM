import { StyleSheet, View } from "react-native";
import Widget from "./Widget";

export default function HouseStatus() {
  return (
    <View style={styles.container}>
      <Widget
        title="Temperature"
        icon={{ name: "thermometer", color: "orangered" }}
        value="25"
        unit="°Celcius"
      />

      <Widget
        title="Gas Level"
        icon={{ name: "gas-cylinder", color: "cadetblue" }}
        value="25"
        unit="PPM"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 8,
    padding: 8,
  },
});
