import useSWR from "swr";
import axios from "axios";
import useToken from "./useToken";

const fetcher = async (thingID, pid, token) => {
  const url = `https://api2.arduino.cc/iot/v2/things/${thingID}/properties/${pid}`
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default function useProperty(thingID, pid, shouldFetch) {
  const { token } = useToken();

  const { data, error, isLoading, isValidating } = useSWR(
    shouldFetch && token ? [thingID, pid, token] : null, // so it would only start fetching data if screen is infocus and token is available
    ([thingID, pid, token]) => fetcher(thingID, pid, token),      // fetcher function
    { refreshInterval: 1000 }  // polling interval, cloud api limits to 10 requests per 1 seconds
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
  };
}
