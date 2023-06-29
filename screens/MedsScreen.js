import { StyleSheet, ToastAndroid, View } from "react-native";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import MedsList from "../components/MedsList";
import MedsModal from "../components/MedsModal";
import useDatabase from "../hooks/useDatabase";

export default function MedsScreen({ route }) {
  const { day } = route.params;

  const [isVisible, setIsVisible] = useState(false);
  const {
    data: meds,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useDatabase("meds", `day="${day}"`);

  if (error) {
    alert("Error getting meds", error);
  }

  if (isValidating) {
    ToastAndroid.show("Checking for updates...", ToastAndroid.SHORT);
  }

  return (
    <View>
      <Text variant="displaySmall" style={styles.title}>
        {day} Medications
      </Text>

      <MedsList meds={meds} isLoading={isLoading} mutate={mutate} />

      <Button
        mode="contained"
        onPress={() => setIsVisible(true)}
        style={{ marginHorizontal: 32 }}>
        Add Medication
      </Button>

      <MedsModal isVisible={isVisible} setIsVisible={setIsVisible} day={day} mutate={mutate} />
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
