import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    name: "",
    error: "",
  });

  const router = useRouter()

  const validateForm = () => {
    let error = { name: "", error: "" };

    if (password.length === 0) {
      error = { name: "Password", error: "Invalid Password length" };
    }
    if (email.length === 0) {
      error = { name: "Email", error: "Invalid Email length" };
    }
    setError(error);
    return error.name === "";
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Data:", password, email);
      router.push('/home')
      setError({ name: "", error: "" });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.innerContainer}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          >
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="johndoe@gmail.com"
                keyboardType="email-address"
                placeholderTextColor="black"
                autoCapitalize="none"
                autoComplete="off"
                value={email}
                onChangeText={setEmail}
              />
              {error.name === "Email" && (
                <Text style={styles.error}>{error.error}</Text>
              )}

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="password"
                placeholderTextColor="black"
                autoCapitalize="none"
                autoComplete="off"
                value={password}
                onChangeText={setPassword}
              />
              {error.name === "Password" && (
                <Text style={styles.error}>{error.error}</Text>
              )}
            </View>
            <View style={styles.button}>
              <Button title="Login" onPress={handleSubmit} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
});
