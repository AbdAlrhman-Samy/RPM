import { FlatList, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  IconButton,
  List,
  Surface,
  Text,
} from "react-native-paper";
import pb from "../pocketbase";

export default function MedsList({ meds, isLoading, isValidating, mutate }) {

  async function handleDeleteMedication(id) {
    try {
      await pb.collection('meds').delete(id);
      mutate();
    } catch (err) {
      console.log(err.message);
      alert(`Error: ${err.message}`);
    }
    
  }

  return (
    <Surface style={styles.container}>
      {isLoading || isValidating ? (
        <ActivityIndicator
          animating={true}
          color="white"
          size={80}
          style={{ flex: 1 }}
        />
      ) : meds.items.length === 0 ? (
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", marginTop: 32, fontWeight: "bold" }}>
          No medications for this day
        </Text>
      ) : (
        <FlatList
          data={meds.items}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={item.name}
                description={`At ${item.time}`}
                left={(props) => <List.Icon {...props} icon="pill" />}
                right={(props) => (<IconButton {...props} icon="delete" iconColor="indianred" mode="contained" size={24} onPress={() => handleDeleteMedication(item.id)} />)}
              />
              <Divider />
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
