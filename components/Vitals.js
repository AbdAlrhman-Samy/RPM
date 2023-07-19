import { View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Widget from "./Widget";

export default function Vitals() {
  const navigation = useNavigation();

  const HEART_RATE_PID = "4508b65c-343a-48d1-b4ed-793fbb2fe789";
  const SPO2_PID = "35c0fdd7-ef9b-4c92-8598-bd7973e44289";

  return (
    <View style={{gap: 8}}>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", fontWeight: "bold" }}>
        Patient Vitals
      </Text>

        <Widget
          pid={HEART_RATE_PID}
          title="Heart Rate"
          unit="BPM"
          icon={{ name: "heart-pulse", color: "tomato" }}
          onPress={() => {
            navigation.navigate("Patient Vital Details", {
              vital: "Heart Rate",
            });
          }}
        />
        <Widget
          pid={SPO2_PID}
          title="SpO2"
          unit="%"
          icon={{ name: "percent", color: "mediumseagreen" }}
          onPress={() => {
            navigation.navigate("Patient Vital Details", { vital: "SpO2" });
          }}
        />

    </View>
  );
}
