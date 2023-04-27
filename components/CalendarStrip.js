import { Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function CalendarStrip() {
  // array of days with fullname
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const date = new Date();

  const [currentDay, setCurrentDay] = useState(date.getDay());
  const { colors } = useTheme();

  const navigation = useNavigation();

  return (
    <>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", fontWeight: "bold" }}>
        Medication Schedule
      </Text>
      <Surface style={styles.container}>
        {days.map((day, index) => {
          return (
            <Surface
              elevation={4}
              mode="flat"
              key={day}
              style={[
                styles.day,
                {
                  borderColor:
                    index === currentDay ? colors.primary : "transparent",
                  borderWidth: 2,
                },
              ]}>
              <Pressable
                onPress={() => navigation.navigate("Medication Details", {day: day})}
                android_ripple={{ color: "white", borderless: true }}
                style={styles.dayPressable}>
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  {day.slice(0, 3)}
                </Text>
              </Pressable>
            </Surface>
          );
        })}
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "18%",
    marginVertical: 8,
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },

  day: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  dayPressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
