import { View, StyleSheet } from "react-native";
import Widget from "./Widget";

export default function Vitals() {
  return (
    <>
      <View style={styles.row}>
        <Widget
          title="Heart Rate"
          value="72"
          unit="BPM"
          icon={{ name: "heart-pulse", color: "tomato" }}
        />

        <Widget
          title="SpO2"
          value="98"
          unit="%"
          icon={{ name: "percent", color: "mediumseagreen" }}
        />
      </View>

      <View style={styles.row}>
        <Widget
          title="Activity"
          value="Sedentary"
          unit=""
          icon={{ name: "human", color: "orchid" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 12,
  },
});
