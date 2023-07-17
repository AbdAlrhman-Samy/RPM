import { StyleSheet, ToastAndroid, View } from "react-native";
import { useState } from "react";
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
    ToastAndroid.show("Error getting medications", ToastAndroid.SHORT);
    console.log(error);
  }

  return (
    <View>
      <Text variant="displaySmall" style={styles.title}>
        {day} Medications
      </Text>

      <MedsList meds={meds} isLoading={isLoading} mutate={mutate} isValidating={isValidating} />

      <Button
        mode="contained"
        onPress={() => setIsVisible(true)}
        style={{ marginHorizontal: 32 }}
        disabled={isLoading || isValidating}
        >
        {isLoading || isValidating ? "Loading..." : "Add Medication"}
      </Button>

      <MedsModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        day={day}
        mutate={mutate}
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