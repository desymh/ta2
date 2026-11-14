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

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setError(null);
    if (!name || !email || !password || !confirm) {
      setError("Semua field wajib diisi");
      return;
    }
    if (password !== confirm) {
      setError("Password tidak cocok");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        signUp({ name, email, password });
      } catch (err) {
        setLoading(false);
        setError(err.message || "Gagal mendaftar");
      }
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Buat Akun Baru</Text>
        <Text style={styles.subtitle}>Daftar untuk memulai strategi afiliasimu</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nama"
            autoCapitalize="words"
          />
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
          <Text style={styles.label}>Konfirmasi Password</Text>
          <TextInput
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            placeholder="••••••••"
            secureTextEntry
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Daftar & Lanjutkan</Text>
            )}
          </TouchableOpacity>
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Sudah punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE = "#EE4D2D";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 24, paddingTop: 50, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: "900", color: ORANGE, textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#888", textAlign: "center", marginBottom: 24 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 20, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  label: { fontSize: 13, fontWeight: "600", color: "#333", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#FFF5F2", borderRadius: 10, padding: 12, color: "#333", borderWidth: 1, borderColor: "#FFD4C8", fontSize: 15 },
  button: { backgroundColor: ORANGE, borderRadius: 10, padding: 14, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  linkRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  linkText: { color: "#888", fontSize: 14 },
  link: { color: ORANGE, fontWeight: "700", fontSize: 14, marginLeft: 4 },
  error: { color: "#D32F2F", fontWeight: "600", textAlign: "center", marginTop: 12 },
});