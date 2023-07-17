import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, Surface, useTheme } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";

export default function VitalChart({ vital }) {
  const NANO_ID = process.env.ARDUINO_NANO_ID;
  const HEART_RATE_PID = "4508b65c-343a-48d1-b4ed-793fbb2fe789";
  const SPO2_PID = "35c0fdd7-ef9b-4c92-8598-bd7973e44289";

  // !: change this to use correct pid when they have data
  // const pid = vital === "Heart Rate" ? HEART_RATE_PID : SPO2_PID;
  const pid = "93d9236e-a3a2-499a-a266-0213ba4f64e4";

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState(
    vital === "Heart Rate"
      ? {
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [72, 67, 90, 110, 100, 85, 95],
              color: () => "tomato",
            },
          ],
          legend: ["BPM"], // optional
        }
      : {
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [94, 96, 98, 99, 97, 94, 93],
              color: () => "mediumseagreen",
            },
          ],
          legend: ["SpO2"], // optional
        }
  );

  async function fetchProperty() {
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("token");
    if (!token) {
      console.log("VitalChart: Token wasn't found.");
      return;
    }
    console.log("VitalChart: Token obtained.");
    await axios
      .get(
        `https://api2.arduino.cc/iot/v2/things/${NANO_ID}/properties/${pid}/timeseries?interval=3600`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        const { labels, values } = filterData(res.data.data);
        setChartData({
          labels,
          datasets: [
            {
              data: values,
              color: () =>
                vital === "Heart Rate" ? "tomato" : "mediumseagreen",
            },
          ],
        });
      })
      .catch((err) => {
        console.log("------ERROR OCCURRED------");
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchProperty()
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Surface elevation={5} style={{ padding: 16, margin: 16, borderRadius: 8 }}>
      {isLoading ? (
        <ActivityIndicator animating={true} size={width - 64} />
      ) : (
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
            },
          }}
          style={{borderRadius: 8}}
          fromZero
          withInnerLines={false}
          bezier
        />
      )}
    </Surface>
  );
}

function filterData(data) {
  const labels = data.map((item) => {
    const date = new Date(item.time);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      // minute: "numeric",
      hour12: true,
    });
    // !: change this to display time when you adjust binning
    // return " "
  });

  const values = data.map((item) => {
    return item.value.toFixed(0);
  });

  return { labels, values };
}
