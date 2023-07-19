import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import useAuth from "../hooks/useAuth";

export default function AuthScreen({ isConnected }) {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {login, isLoading, error} = useAuth()

  function handleLogin() {
    login(email, password).then(() => {
      setPassword("");
      setEmail("");
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="displayLarge" style={{ marginBottom: 50 }}>
        Hello!
      </Text>

      {error && <Text style={styles.alert}>{error}</Text>}

      <TextInput
        style={styles.input}
        disabled={!isConnected}
        label="Email"
        left={<TextInput.Icon icon="email" />}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        label="Password"
        disabled={!isConnected}
        left={<TextInput.Icon icon="lock" />}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
            color="gray"
          />
        }
        onBlur={() => setShowPassword(false)}
      />

      <Button
        mode="contained"
        icon="login"
        loading={isLoading}
        onPress={handleLogin}
        theme={{ colors: { primary: colors.primary } }}
        uppercase
        disabled={!isConnected}>
        {isConnected ? "Login" : "Please connect to the internet first."}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  input: {
    width: "80%",
  },

  alert: {
    backgroundColor: "indianred",
    color: "white",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 16,
  },
});
