import { View, StyleSheet } from "react-native";
import Vitals from "../components/Vitals";
import Header from "../components/Header";
import CalendarStrip from "../components/CalendarStrip";
import { Divider } from "react-native-paper";
import useDatabase from "../hooks/useDatabase";

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
        },
        id: `${medName}-${day}-${hours}-${minutes}`,
      },
      trigger
    );

    console.log(`Notification created for ${medName} at ${date}`)
  } catch (e) {
    console.log("Error: ", e);
  }

}


export default function PatientScreen() {
  

  const {
    data: meds,
    error: medsError,

  } = useDatabase("meds");

  if (medsError) {
    alert("Error getting meds");
    console.log(medsError);
  }

  if (meds) {
    meds.items.forEach(med => {
      const { name, day, time } = med;
      const [hours, minutes] = time.split(":");
      createTimedNotification(day, parseInt(hours), parseInt(minutes), name)
    })
  }


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
