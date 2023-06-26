import { useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Surface, useTheme } from "react-native-paper";

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43],
//       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//       strokeWidth: 5, // optional
//     },
//   ],
//   legend: ["BPM"], // optional
// };

export default function VitalChart({ chartData }) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const theme = useTheme();

  return (
    <Surface elevation={5} style={{ padding: 16, margin: 16, borderRadius: 8 }}>
      <LineChart
        data={chartData}
        width={width - 64}
        height={height / 2 - 64}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.elevation.level4,
          color: () => theme.colors.primary,
          style: {
            borderRadius: 32,
          },
        }}
        bezier
      />
    </Surface>
  );
}
