import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { ActivityIndicator, Card, Text, useTheme } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import useProperty from "../hooks/useProperty";

export default function Widget({ title, unit, icon, onPress, pid }) {

  const theme = useTheme();

  const isFocused = useIsFocused();

  const NANO_ID = process.env.ARDUINO_NANO_ID;

  const {
    data: property,
    error,
    isLoading,
  } = useProperty(NANO_ID, pid, isFocused);

  if (error) alert("Couldn't fetch property ", title);

  return (
    <Card style={[styles.container, { borderLeftColor: icon.color }]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "lightgrey", borderless: true }}>
        <Card.Title
          title={title}
          titleVariant="titleMedium"
          titleStyle={{ fontWeight: "bold" }}
          left={(props) => (
            <Icon name={icon.name} color={icon.color} {...props} />
          )}
        />

        <Card.Content style={styles.content}>
          
            <Text variant="displayLarge" style={{ fontWeight: "bold" }}>
              {property ? property.last_value : "-"}
            </Text>
          {unit && <Text variant="titleLarge">{unit}</Text>}
        </Card.Content>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 4,
  },

  content: {
    alignItems: "center",
    marginBottom: 12,
  },
});
