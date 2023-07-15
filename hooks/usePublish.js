import useSWRMutation from "swr";
import axios from "axios";
import useToken from "./useToken";

const fetcher = async (thingID, pid, value, token) => {
  const url = `https://api2.arduino.cc/iot/v2/things/${thingID}/properties/${pid}/publish`
  const res = await axios.put(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      "value": value
    }
  });

  return res.data;
};

export default function usePublish(thingID, pid, value) {
  const { token } = useToken();

  return useSWRMutation(
    [thingID, pid, value],
    ([thingID, pid, value, token]) => fetcher(thingID, pid, value, token),      // fetcher function
  )
}
