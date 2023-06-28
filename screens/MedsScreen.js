import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "react-native-paper";
import MedsList from "../components/MedsList";
import MedsModal from "../components/MedsModal";

export default function MedsScreen({ route }) {
  const { day } = route.params;

  const [isVisible, setIsVisible] = useState(false);
  // find the day in the dummy data and get the meds for that day
  const [meds, setMeds] = useState(
    dummyData.find((item) => item.day === day).meds
  );

  return (
    <View>
      <Text variant="displaySmall" style={styles.title}>
        {day} Medications
      </Text>

      <MedsList meds={meds} />

      <View style={styles.row}>
        <Button
          mode="contained-tonal"
          onPress={() => setMeds([])}
          style={{ flex: 1 }}>
          Clear All
        </Button>

        <Button
          mode="contained"
          onPress={() => setIsVisible(true)}
          style={{ flex: 1 }}>
          Add Medication
        </Button>
      </View>

      <MedsModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        day={day}
        setMeds={setMeds}
        meds={meds}
      />
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

// TODO: Replace this with data from the database
const dummyData = [
  {
    day: "Monday",
    meds: [
      {
        name: "Aspirin",
        dosage: "100mg",
        time: "8:00",
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        time: "12:00",
      },
      {
        name: "Metoprolol",
        dosage: "25mg",
        time: "3:00",
      },
    ],
  },

  {
    day: "Tuesday",
    meds: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        time: "9:00",
      },
      {
        name: "Ibuprofen",
        dosage: "100mg",
        time: "8:00",
      },
      {
        name: "Catafast",
        dosage: "10mg",
        time: "12:00",
      },
    ],
  },

  {
    day: "Wednesday",
    meds: [
      {
        name: "Aspirin",
        dosage: "100mg",
        time: "8:00",
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        time: "12:00",
      },
    ],
  },

  {
    day: "Thursday",
    meds: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        time: "9:00",
      },
      {
        name: "Ibuprofen",
        dosage: "100mg",
        time: "8:00",
      },
    ],
  },

  {
    day: "Friday",
    meds: [
      {
        name: "Ibuprofen",
        dosage: "100mg",
        time: "8:00",
      },
      {
        name: "Catafast",
        dosage: "10mg",
        time: "12:00",
      },
    ],
  },

  {
    day: "Saturday",
    meds: [
      {
        name: "Aspirin",
        dosage: "100mg",
        time: "8:00",
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        time: "12:00",
      },
      {
        name: "Metoprolol",
        dosage: "25mg",
        time: "3:00",
      },
    ],
  },

  {
    day: "Sunday",
    meds: [
      {
        name: "Aspirin",
        dosage: "100mg",
        time: "8:00",
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        time: "12:00",
      },
      {
        name: "Metoprolol",
        dosage: "25mg",
        time: "3:00",
      },
    ],
  },
];
