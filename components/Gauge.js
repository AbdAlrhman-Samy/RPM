import { StyleSheet, View, useWindowDimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Card, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default function Gauge({ title, icon, max, value, unit }) {
  const theme = useTheme();

  const width = useWindowDimensions().width;

  return (
    <Card style={[styles.container, { borderBottomColor: icon.color, borderBottomWidth: 4 }]}>
      <Card.Title
          title={title}
          titleVariant="titleMedium"
          titleStyle={{ fontWeight: "bold" }}
          left={(props) => (
            <Icon name={icon.name} color={icon.color} {...props} />
          )}
        />
      <AnimatedCircularProgress
        size={width / 2 - 48}
        width={15}
        fill={(value / max) * 100}
        tintColor={"limegreen"}
        backgroundColor={theme.colors.background}
        tintColorSecondary="orangered"
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
        style={{ marginHorizontal: 8 }}>
        {(fill) => (
          <View style={styles.content}>
            <Text
              style={{
                fontSize: width / 12,
                color: theme.colors.onBackground,
              }}>
              {((fill / 100) * max).toFixed(0)}
              <Text
                style={{
                  fontSize: width / 18,
                  color: theme.colors.onBackground,
                }}>
                {unit}
              </Text>
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  content: {
    flex: 1,
    padding: 8,
    marginVertical: 16,
    alignContent: "center",
    justifyContent: "center",
  },
});
