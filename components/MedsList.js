import { FlatList, StyleSheet, ToastAndroid } from "react-native";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  List,
  Surface,
  Text,
} from "react-native-paper";
import pb from "../pocketbase";
import { useState } from "react";

export default function MedsList({ meds, isLoading, isValidating, mutate }) {

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteMedication(id) {
    setIsDeleting(true);
    try {
      await pb.collection('meds').delete(id);
      ToastAndroid.show("Medication deleted.", ToastAndroid.SHORT);
      mutate();
    } catch (err) {
      console.log(err.message);
      ToastAndroid.show("Error deleting medication.", ToastAndroid.SHORT);
    }
    setIsDeleting(false);
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
                right={(props) => (<IconButton {...props} icon="delete" iconColor="indianred" mode="contained" size={24} onPress={() => handleDeleteMedication(item.id)} disabled={isDeleting || isValidating} />)}
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
