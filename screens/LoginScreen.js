import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ORANGE = "#EE4D2D";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("budi.santoso@email.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signIn();
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.brandBox}>
          <Text style={styles.brand}>PortoDecision</Text>
          <Text style={styles.brandSub}>Kelola target & pendapatanmu</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="contoh@email.com" keyboardType="email-address" autoCapitalize="none" />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Masuk</Text>}
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
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 24, paddingTop: 50, paddingBottom: 40 },
  brandBox: { alignItems: "center", marginBottom: 24 },
  brand: { fontSize: 30, fontWeight: "900", color: ORANGE },
  brandSub: { fontSize: 13, color: "#888", marginTop: 4 },
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