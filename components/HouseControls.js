import { StyleSheet, View } from "react-native";
import ControlWidget from "./ControlWidget";

export default function HouseControls() {
  return (
    <View style={styles.row}>
      {/* // TODO: replace handleToggle with functions connected to the Cloud */}
      <ControlWidget
        title="Fan"
        icon={{ on: "fan", off: "fan-off" }}
        // handleToggle={handleFanToggle}
      />

      <ControlWidget
        title="Living Room"
        icon={{ on: "lightbulb-on", off: "lightbulb-off" }}
        // handleToggle={handleLivingRoomLightToggle}
      />

      <ControlWidget
        title="Bedroom"
        icon={{ on: "lightbulb-on", off: "lightbulb-off" }}
        // handleToggle={handleBedroomLightToggle}
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
    padding: 8,
  },
});
