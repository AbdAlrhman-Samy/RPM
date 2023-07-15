import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import useProperty from "../hooks/useProperty";
export default function DeviceStatus() {
  const NANO_ID = process.env.ARDUINO_NANO_ID;
  const BATTERY_PID = "93d9236e-a3a2-499a-a266-0213ba4f64e4";

  const isFocused = useIsFocused();

  const { data: batteryPercentage } = useProperty(
    NANO_ID,
    BATTERY_PID,
    isFocused
  );

  return (
    <View style={styles.row}>
      <Chip icon="wifi">Connected</Chip>

      <Chip icon="battery">{batteryPercentage? batteryPercentage.last_value : "-"}%</Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 8,
  },
});
