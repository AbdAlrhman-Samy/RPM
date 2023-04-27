import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, DataTable, Text } from "react-native-paper";
import MedsList from "../components/MedsList";

const dummyData = [
  {
    name: "Aspirin",
    dosage: "100mg",
    time: "8:00 AM",
  },
  {},
];

export default function MedsScreen({ route }) {
  const { day } = route.params;

  return (
    <View>
      <Text variant="displaySmall" style={styles.title}>
        {day} Medications
      </Text>

      <MedsList />

      <View style={styles.row}>
        <Button
          mode="contained-tonal"
          onPress={() => {}}
          style={{ flex: 1 }}>
          Clear All
        </Button>
        <Button
          mode="contained"
          onPress={() => {}}
          style={{ flex: 1 }}>
          Add Medication
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 64,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 32,
    paddingHorizontal: 32,
  },
});
