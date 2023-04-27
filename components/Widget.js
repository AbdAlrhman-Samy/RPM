import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Card, Text } from "react-native-paper";

export default function Widget({ title, value, unit, icon, onPress }) {
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
            {value}
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
