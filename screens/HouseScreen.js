import { StyleSheet, View } from "react-native";
import HouseHeader from "../components/HouseHeader";
import HouseControls from "../components/HouseControls";
import Gauge from "../components/Gauge";
import HouseStatus from "../components/HouseStatus";
import { useIsFocused } from "@react-navigation/native";
import { Divider, Text } from "react-native-paper";

export default function HouseScreen() {

  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <HouseHeader />

      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          House Controls
        </Text>
        <HouseControls />

        <Divider style={{marginVertical: 32}}/>
        <Text variant="titleLarge" style={styles.title}>
          House Sensors
        </Text>
        <HouseStatus isFocused={isFocused} />
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
    flex: 1,
    padding: 16,
    marginVertical: 16,
    alignContent: "center",
    justifyContent: "center",
    gap: 8,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
