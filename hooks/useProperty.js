import useSWR from "swr";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const fetcher = async (thingID, pid) => {
  let token = await SecureStore.getItemAsync("token")
  const url = `https://api2.arduino.cc/iot/v2/things/${thingID}/properties/${pid}`
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export default function useProperty(thingID, pid, shouldFetch) {

  const { data, error, isLoading, isValidating } = useSWR(
    shouldFetch ? [thingID, pid] : null, // so it would only start fetching data if screen is infocus and token is available
    ([thingID, pid]) => fetcher(thingID, pid),      // fetcher function
    { refreshInterval: 1000 }  // polling interval, cloud api limits to 10 requests per 1 seconds
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
  };
}
