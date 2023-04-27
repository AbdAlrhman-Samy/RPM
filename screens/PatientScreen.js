import { View, StyleSheet } from "react-native";
import Vitals from "../components/Vitals";
import Header from "../components/Header";
import CalendarStrip from "../components/CalendarStrip";
import { Divider } from "react-native-paper";

export default function PatientScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <CalendarStrip />
        <Divider />
        <Vitals />
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
    padding: 8,
    width: "100%",
  },
});
