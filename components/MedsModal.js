import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";

export default function MedsModal({
  isVisible,
  setIsVisible,
  day,
  setMeds,
  meds,
}) {
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState(false);

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  // TODO: add medication to database not dummy data
  function handleAddMedication() {
    if (name === "" || dosage === "" || time === "") {
      setError(true);
      return;
    }

    const newMed = { name, dosage: `${dosage}mg`, time };
    const newMeds = [...meds, newMed];
    setMeds(newMeds);
    setError(false);
    setIsVisible(false);
    setName("");
    setDosage("");
    setTime("");
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        contentContainerStyle={[
          { backgroundColor: colors.background },
          styles.container,
        ]}>
        <Text variant="titleLarge" style={styles.title}>
          Add Medication
        </Text>
        <Divider style={{ marginBottom: 16 }} />

        <View>
          <TextInput
            label="Medication Name"
            mode="outlined"
            style={{ marginBottom: 16 }}
            onChangeText={setName}
          />

          <View style={styles.row}>
            <TextInput
              label="Dosage"
              mode="outlined"
              style={{ flex: 1 }}
              onChangeText={setDosage}
              keyboardType="numeric"
              helperText="mg"
            />
            <Button
              mode="contained-tonal"
              icon={time === "" ? "clock-outline" : "check"}
              style={{ flex: 1 }}
              onPress={() => setIsTimePickerVisible(true)}>
              {time === "" ? "Select Time" : time}
            </Button>
          </View>
        </View>

        <TimePickerModal
          visible={isTimePickerVisible}
          onDismiss={() => setIsTimePickerVisible(false)}
          onConfirm={(time) => {
            setTime(`${time.hours}:${time.minutes}`);
            setIsTimePickerVisible(false);
          }}
          label="Select Time"
          cancelLabel="Cancel"
          confirmLabel="Ok"
          animationType="fade"
          use24HourClock
        />

        {error && <Text style={styles.alert}>Please fill out all fields</Text>}

        <Button
          mode="contained"
          onPress={handleAddMedication}
          style={{ marginTop: 16 }}>
          Add Medication
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    margin: 32,
    borderRadius: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
  },

  alert: {
    backgroundColor: "indianred",
    color: "white",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 16,
  },
});
