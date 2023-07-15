import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Switch, Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";

export default function ControlWidget({ title, icon, pid }) {
  const ESP32_ID = process.env.ESP32_ID;
  const { token } = useToken();

  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  async function handleToggle() {
    console.log(`Toggling ${title}: `, !isOn);
    setIsLoading(true);
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
        console.log("Response: ", res.status)
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
      await axios.get(
        `https://api2.arduino.cc/iot/v2/things/${ESP32_ID}/properties/${pid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        setIsLoading(false);
        setIsOn(res.data.last_value);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
    }

    if(token){
      fetchProperty()
    }
    
  }, [token])
  

  // const {data, isLoading: isPropLoading} = useProperty(ESP32_ID, pid, true);
  
  // if (data) console.log(title, data.last_value)

  return (
    <Card style={styles.container}>
      <MaterialCommunityIcons
        name={isOn? icon.on : icon.off}
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
