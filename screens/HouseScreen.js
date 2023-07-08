import { StyleSheet, View } from "react-native";
import { Card, Divider, Switch, Text, useTheme } from "react-native-paper";
import Widget from "../components/Widget";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HouseHeader from "../components/HouseHeader";

export default function HouseScreen() {
  const theme = useTheme();

  const [isFanOn, setIsFanOn] = useState(false);
  const [isLivingRoomLightOn, setIsLivingRoomLightOn] = useState(false);
  const [isBedroomLightOn, setIsBedroomLightOn] = useState(false);

  function handleFanToggle() {
    console.log("Fan toggled");
    setIsFanOn((prev) => !prev);
  }

  function handleLivingRoomLightToggle() {
    console.log("Living room light toggled");
    setIsLivingRoomLightOn((prev) => !prev);
  }

  function handleBedroomLightToggle() {
    console.log("Bedroom light toggled");
    setIsBedroomLightOn((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <HouseHeader />

      <View style={styles.content}>
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", fontWeight: "bold" }}>
          Fire Detection
        </Text>

        <View style={styles.row}>
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
        <View style={styles.row}>
          <Card style={styles.control}>
            <MaterialCommunityIcons
              name={isFanOn ? "fan" : "fan-off"}
              size={32}
              color={isFanOn ? theme.colors.primary : theme.colors.disabled}
              style={{ alignSelf: "center" }}
            />
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", textAlign: "center" }}>
              Kitchen Fan
            </Text>

            <Switch value={isFanOn} onValueChange={handleFanToggle} style={{ alignSelf: "center" }} />
          </Card>

          <Card style={styles.control}>
            <MaterialCommunityIcons
              name={isLivingRoomLightOn ? "lightbulb-on" : "lightbulb-off"}
              size={32}
              color={isLivingRoomLightOn ? theme.colors.primary : theme.colors.disabled}
              style={{ alignSelf: "center" }}
            />

            
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", textAlign: "center" }}>
              Living Room
            </Text>

            <Switch value={isLivingRoomLightOn} onValueChange={handleLivingRoomLightToggle} style={{ alignSelf: "center" }} />
          </Card>

          <Card style={styles.control}>
            <MaterialCommunityIcons
              name={isBedroomLightOn ? "lightbulb-on" : "lightbulb-off"}
              size={32}
              color={isBedroomLightOn ? theme.colors.primary : theme.colors.disabled}
              style={{ alignSelf: "center" }}
            />
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", textAlign: "center" }}>
              Bedroom
            </Text>

            <Switch value={isBedroomLightOn} onValueChange={handleBedroomLightToggle} style={{ alignSelf: "center" }} />
          </Card>
        </View>
      </View>

      <Divider style={{ marginVertical: 16 }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  content: {
    flex: 2,
    padding: 8,
    height: "100%",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 8,
    padding: 8,
  },

  column: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    flex: 3,
  },

  control: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
  },
});
