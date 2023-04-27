import { FlatList, StyleSheet } from "react-native";
import { Button, List, Surface } from "react-native-paper";

export default function MedsList() {

  const date = new Date();
  //time in 12:00AM format
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Surface style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`${item.dosage} at ${item.time}`}
            left={(props) => <List.Icon {...props} icon="pill" />}
            right={() => {
              // TODO: add button to send notification to patient
              // !: bellow is some bullshit lmao
              if (item.time === time) {
                return <Button icon={"check"} mode="text" compact />;
              } else {
                return <Button icon={"close"} mode="text" compact />;
              }
            }}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 8,
    height: "60%",
    marginBottom: 32,
  },
});


// TODO: Replace this with data from the database
const dummyData = [
  {
    name: "Aspirin",
    dosage: "100mg",
    time: "8:00 AM",
  },
  {
    name: "Lisinopril",
    dosage: "10mg",
    time: "12:00 PM",
  },
  {
    name: "Metoprolol",
    dosage: "25mg",
    time: "3:00 PM",
  },
  {
    name: "Atorvastatin",
    dosage: "20mg",
    time: "9:00 PM",
  },
  {
    name: "Ibuprofen",
    dosage: "100mg",
    time: "8:00 AM",
  },
  {
    name: "Catafast",
    dosage: "10mg",
    time: "12:00 PM",
  },
  {
    name: "Idklmao",
    dosage: "25mg",
    time: "3:00 PM",
  },
  
];
