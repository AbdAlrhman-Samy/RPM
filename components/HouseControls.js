import { StyleSheet, View } from "react-native";
import ControlWidget from "./ControlWidget";

export default function HouseControls() {

  const FAN_PID = "59efb422-8ab1-4729-ae1f-be1287d2624d";
  const LIVINGROOM_PID = "a262c6a5-1ba1-4589-b86f-433a8dc14c98"
  const BEDROOM_PID = "dac6a149-d665-4eca-ae6c-541e52cc2955"


  return (
    <View style={styles.row}>
      <ControlWidget
        title="Fan"
        icon={{ on: "fan", off: "fan-off" }}
        pid={FAN_PID}
      />

      <ControlWidget
        title="Living Room"
        icon={{ on: "lightbulb-on", off: "lightbulb-off" }}
        pid={LIVINGROOM_PID}
      />

      <ControlWidget
        title="Bedroom"
        icon={{ on: "lightbulb-on", off: "lightbulb-off" }}
        pid={BEDROOM_PID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
});
