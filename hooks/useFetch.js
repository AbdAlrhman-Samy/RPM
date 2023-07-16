import { useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default function useFetch(url) {
  // const { token } = useToken();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(url) {
    setIsLoading(true);
    
    let token = await SecureStore.getItemAsync("token")
    if(!token) {
      console.log("No token available")
      return
    }
    console.log("usefetch Token Found! Fetching...");
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("useFetch Error: ", error);
        setError(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData(url)
  
  }, [])
  
  return { data, error, isLoading };

}
