import { StyleSheet, View } from "react-native";
import { Card, Divider, Switch, Text, useTheme } from "react-native-paper";
import Widget from "../components/Widget";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HouseHeader from "../components/HouseHeader";

export default function HouseScreen() {
  const theme = useTheme();

  const [isFanOn, setIsFanOn] = useState(false);

  function handleFanToggle() {
    console.log("Fan toggled");
    setIsFanOn((prev) => !prev);
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
          <View style={styles.column}>
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

          <Card style={styles.fanControl}>
            <Text
              variant="headlineLarge"
              style={{ fontWeight: "bold", textAlign: "center" }}>
              Fan
            </Text>

            <MaterialCommunityIcons
              name={isFanOn ? "fan" : "fan-off"}
              size={64}
              color={isFanOn ? theme.colors.primary : theme.colors.disabled}
              style={{ marginVertical: 16 }}
            />

            <Switch value={isFanOn} onValueChange={handleFanToggle} />
          </Card>
        </View>
      </View>

      <Divider style={{ marginVertical: 16 }} />

      <View style={styles.test}>
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", fontWeight: "bold", flex: 1 }}>
          Front Door Camera
        </Text>
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
    flex: 2,
    padding: 8,
    height: "100%",
    marginBottom: 8
  },

  test: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 8,
    padding: 8,
  },

  column: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    flex: 3,
  },

  fanControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
