import { useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
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
import pb from "../pocketbase";

import notifee, { AndroidImportance, TriggerType } from "@notifee/react-native";

async function createTimedNotification(day, hours, minutes, medName) {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });

  const notificationId = `${medName}-${day}-${hours}-${minutes}`

  await notifee.getTriggerNotifications().then(async (ids) => {
    if (ids.includes(notificationId)) {
      await notifee.cancelNotification(notificationId)
    }
  });


  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const date = new Date(Date.now());
  date.setDate(date.getDate() + (7 + days.indexOf(day) - date.getDay()) % 7);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  const currentDate = new Date(Date.now());

  if (currentDate > date) {
    date.setDate(date.getDate() + 7);
  }

  // Create a time-based trigger
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  try {
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: "Medication Reminder",
        body: `Alert the patient to take ${medName} at ${hours}:${minutes}`,
        android: {
          channelId,
          actions: [
            {
              title: "Take Medication",
              pressAction: {
                id: "send-reminder",
              }
            }
          ]
        },
        id: notificationId,
        data: {
          medName,
        }
      },
      trigger
    );

    console.log(`Notification created for ${medName} at ${date}`)
  } catch (e) {
    console.log("Error: ", e);
  }

}


export default function MedsModal({ isVisible, setIsVisible, day, mutate }) {
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  async function handleAddMedication() {
    setError("")
    if (name === "" || time === "") {
      setError("Please fill out all fields");
      return;
    }

    const data = {
      name,
      time,
      day,
    };

    setIsLoading(true);

    try {
      await pb.collection("meds").create(data);
      await createTimedNotification(day, parseInt(time.split(":")[0]), parseInt(time.split(":")[1]), name)
      mutate();
      setIsVisible(false);
      setName("");
      setTime("");
      setError("");
    } catch (err) {
      console.log(err.data.data);
      if(err.data.data.name.message) setError(`Name Error: ${err.data.data.name.message}`);
      else if(err.data.data.time.message) setError(`Time Error: ${err.data.data.time.message}`);
      else setError(err.message);
    }

    setIsLoading(false);
  }

  const date = new Date(Date.now());

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
          setError("");
          setName("");
          setTime("");
        }}
        contentContainerStyle={[
          { backgroundColor: colors.background },
          styles.container,
        ]}>
        <Text variant="titleLarge" style={styles.title}>
          Add Medication
        </Text>
        {error && <Text style={styles.alert}>{error}</Text>}

        <Divider style={{ marginVertical: 8 }} />

        <View>
          <TextInput
            label="Medication Name"
            mode="outlined"
            style={{ marginBottom: 16 }}
            onChangeText={setName}
            maxLength={30}
            value={name}
          />

          <View style={styles.row}>
            <Button
              mode="contained-tonal"
              icon={time === "" ? "clock-outline" : "check"}
              style={{ flex: 1 }}
              onPress={() => setIsTimePickerVisible(true)}>
              {time === "" ? "Time" : time}
            </Button>
          </View>
        </View>

        <TimePickerModal
          visible={isTimePickerVisible}
          onDismiss={() => setIsTimePickerVisible(false)}
          onConfirm={(time) => {
            if(isNaN(time.hours) || isNaN(time.minutes)){
              ToastAndroid.showWithGravity("Please select a valid time", ToastAndroid.SHORT, ToastAndroid.CENTER)
              return;
            }
            setTime(`${time.hours}:${time.minutes}`);
            setIsTimePickerVisible(false);
          }}
          label="Select Time"
          cancelLabel="Cancel"
          confirmLabel="Ok"
          animationType="fade"
          use24HourClock
        />

        <Button
          mode="contained"
          onPress={handleAddMedication}
          style={{ marginTop: 16 }}
          icon={isLoading ? "loading" : "plus"}
          loading={isLoading}>
          Add Medication
        </Button>

        <Button
          mode="outlined"
          onPress={() => {
            createTimedNotification(day, date.getHours(), date.getMinutes() + 1, "Test Medication")
          }}
          style={{ marginTop: 16 }}
          icon="bell">
          Test Notification
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
