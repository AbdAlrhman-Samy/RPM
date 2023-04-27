import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
export default function DeviceStatus() {
  return (
    <View style={styles.row}>
      <Chip icon="wifi">Connected</Chip>

      <Chip icon="battery">100%</Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  }
});
