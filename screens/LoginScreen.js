import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    console.log("[Login] Attempt login:", email);
    setError(null);
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signIn();
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Selamat Datang</Text>
        <Text style={styles.subtitle}>Masuk ke akun Anda</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="contoh@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk</Text>
            )}
          </TouchableOpacity>
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1a252f", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#6b7a8d", textAlign: "center", marginBottom: 28 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 20, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  label: { fontSize: 13, fontWeight: "600", color: "#34495e", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#f1f5f9", borderRadius: 10, padding: 12, color: "#1a252f", borderWidth: 1, borderColor: "#e2e8f0", fontSize: 15 },
  button: { backgroundColor: "#2c3e50", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  linkRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  linkText: { color: "#6b7a8d", fontSize: 14 },
  link: { color: "#2c3e50", fontWeight: "700", fontSize: 14, marginLeft: 4 },
  error: { color: "#c0392b", fontWeight: "600", textAlign: "center", marginTop: 12 },
});