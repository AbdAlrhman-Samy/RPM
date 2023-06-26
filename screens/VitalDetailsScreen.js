import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import ActivityHistory from "../components/ActivityHistory";
import VitalChart from "../components/VitalChart";

export default function VitalDetailsScreen({ route }) {
  const { vital } = route.params;

  // TODO: create a hook to get timeseries data from arduino cloud
  const chartData =
    vital === "Heart Rate"
      ? {
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [72, 67, 90, 110, 100, 85, 95],
              color: () => "tomato",
            },
          ],
          legend: ["BPM"], // optional
        }
      : {
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [94, 96, 98, 99, 97, 94, 93],
              color: () => "mediumseagreen",
            },
          ],
          legend: ["SpO2"], // optional
        };

  return (
    <View>
      <Text variant="displaySmall" style={styles.title}>
        {vital} History
      </Text>

      {vital === "Activity" ? ( <ActivityHistory /> ) : ( <VitalChart chartData={chartData} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 64,
  },
});
