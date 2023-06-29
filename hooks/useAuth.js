import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import pb from "../pocketbase";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setIsLoggedIn(pb.authStore.isValid);
    });

    return () => unsubscribe();
  }, []);

  async function login(email, pswrd) {
    setIsLoading(true);

    if (email === "" || pswrd === "") {
      setError("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    try {
      await pb.admins.authWithPassword(email.trim(), pswrd.trim());
      setIsLoading(false);
      setError(null);
      ToastAndroid.show("Logged in successfully!", ToastAndroid.SHORT);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  function logout() {
    pb.authStore.clear();
    ToastAndroid.show("Logged out successfully!", ToastAndroid.SHORT);
  }

  return { login, logout, isLoggedIn, isLoading, error };
}
