import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Switch, Text, useTheme } from "react-native-paper";
import { useState } from "react";

export default function ControlWidget({ title, icon, handleToggle}) {


  const [isOn, setIsOn] = useState(false);

  const theme = useTheme();

  function handleToggle() {
    console.log("Fan toggled");
    setIsOn((prev) => !prev);
  }

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
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  }
});
