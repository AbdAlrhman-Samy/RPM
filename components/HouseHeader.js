import { StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HouseHeader() {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.elevation.level2 }]}>
      <MaterialCommunityIcons
        name="home-assistant"
        size={80}
        color={colors.primary}
      />
      <View>
        <Text variant="displaySmall" style={{ fontWeight: "bold" }}>
          House
        </Text>
        <Chip icon="wifi">Connected</Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    width: "100%",
    height: "15%",
    borderBottomRightRadius: 128,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
