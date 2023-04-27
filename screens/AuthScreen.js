import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen({ setIsLoggedIn }) {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="displayLarge" style={{ marginBottom: 50 }}>
        Hello!
      </Text>

      <TextInput
        style={styles.input}
        label="Email"
        left={<TextInput.Icon icon="email" />}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        label="Password"
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
        uppercase>
        Login
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
});
