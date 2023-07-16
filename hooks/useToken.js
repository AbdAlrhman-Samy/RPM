import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useEffect } from "react";

const tokenFetcher = async (url) => {
  console.log("Token fetcher running...")
  const res = await axios.post(
    url,
    {
      grant_type: "client_credentials",
      audience: "https://api2.arduino.cc/iot",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data.access_token;
};

export default function useToken() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "https://api2.arduino.cc/iot/v1/clients/token",
    tokenFetcher
  );

  useEffect(() => {
    if(!data){
      trigger(); // trigger the mutation to get the token on first render
    }

    const interval = setInterval(() => {
      trigger();
    }, 1000 * 60 * 4); // referesh token every 4 minutes because token dies in 5 minutes

    return () => clearInterval(interval);
  }, [data]);

  return {
    token: data,
    error,
    isMutating,
  };
}
