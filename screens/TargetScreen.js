import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TargetScreen({ navigation }) {
  const [target, setTarget] = useState("7000000");

  const handleSave = () => {
    if (!target) {
      Alert.alert("Peringatan", "Target wajib diisi");
      return;
    }
    Alert.alert("Sukses", "Target bulanan tersimpan (dummy)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Input Target Bulanan</Text>
        <Text style={styles.subtitle}>Tentukan target pendapatan bulan ini</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Target Pendapatan (Rp)</Text>
          <TextInput
            style={styles.input}
            value={target}
            onChangeText={setTarget}
            placeholder="7000000"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>Target akan digunakan untuk perhitungan kelas strategi.</Text>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a252f", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#6b7a8d", marginBottom: 20 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 20, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  label: { fontSize: 13, fontWeight: "600", color: "#34495e", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#f1f5f9", borderRadius: 10, padding: 12, color: "#1a252f", borderWidth: 1, borderColor: "#e2e8f0", fontSize: 15 },
  hint: { fontSize: 12, color: "#95a5a6", marginTop: 8, marginBottom: 16 },
  button: { backgroundColor: "#2c3e50", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});