import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Switch, Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function ControlWidget({ title, icon, pid }) {
  const ESP32_ID = process.env.ESP32_ID;

  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  async function handleToggle() {
    console.log(`Toggling ${title}: `, !isOn);
    setIsLoading(true);

    let token = await SecureStore.getItemAsync("token");
    if (!token) {
      console.log("ControlWidget: Token wasn't found.");
      return;
    }
    console.log("ControlWidget: Token obtained.");
    await axios
      .put(
        `https://api2.arduino.cc/iot/v2/things/${ESP32_ID}/properties/${pid}/publish`,
        { value: !isOn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Response: ", res.status);
        setIsLoading(false);
        setIsOn(!isOn);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data);
        alert("Something went wrong");
      });
  }

  useEffect(() => {
    async function fetchProperty() {
      setIsLoading(true);
      let token = await SecureStore.getItemAsync("token");
      if (!token) {
        console.log("ControlWidget: Token wasn't found.");
        return;
      }
      console.log("ControlWidget: Token obtained.");
      await axios
        .get(
          `https://api2.arduino.cc/iot/v2/things/${ESP32_ID}/properties/${pid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          setIsOn(res.data.last_value);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }

    fetchProperty();
  }, []);

  return (
    <Card style={styles.container}>
      <MaterialCommunityIcons
        name={isOn ? icon.on : icon.off}
        size={32}
        color={isOn ? theme.colors.primary : theme.colors.disabled}
        style={{ alignSelf: "center" }}
      />
      <Text
        variant="titleMedium"
        style={{ fontWeight: "bold", textAlign: "center" }}>
        {title}
      </Text>

      <Switch
        value={isOn}
        onValueChange={handleToggle}
        style={{ alignSelf: "center" }}
        disabled={isLoading}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
