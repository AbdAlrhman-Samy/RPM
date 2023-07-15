import { StyleSheet, View } from "react-native";
import Gauge from "./Gauge";
import useProperty from "../hooks/useProperty";

export default function HouseStatus({ isFocused }) {
  const ESP32_ID = process.env.ESP32_ID;
  const TEMP_PID = "834f859a-2c92-4a2c-a98d-63b12a4c3bbf";
  const GAS_PID = "41b5b9ef-aa0e-432e-8f3c-41996dfa8cde";

  const {
    data: temp,
    error: tempError,
  } = useProperty(ESP32_ID, TEMP_PID, isFocused);
  const {
    data: gas,
    error: gasError,
  } = useProperty(ESP32_ID, GAS_PID, isFocused);

  // if (temp && !tempLoading) console.log(temp.name, temp.last_value);
  // if (gas && !gasLoading) console.log(gas.name, gas.last_value);

  if (tempError) {
    alert("Error getting temperature");
    console.log(tempError);
  }

  if (gasError) {
    alert("Error getting gas level");
    console.log(gasError);
  }

  return (
    <View style={styles.container}>
      <Gauge
        max={90}
        value={temp? temp.last_value : 0}
        title="Temperature"
        icon={{ name: "thermometer", color: "orangered" }}
        unit="°C"
      />

      <Gauge
        title="Gas Level"
        icon={{ name: "gas-cylinder", color: "cadetblue" }}
        max={10000}
        value={gas? gas.last_value : 0}
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
