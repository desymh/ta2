import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ORANGE = "#EE4D2D";

export default function TargetScreen() {
  const [target, setTarget] = useState("7000000");

  const handleSave = () => {
    const val = parseInt(String(target).replace(/[^0-9]/g, ""), 10) || 0;
    if (!val) { Alert.alert("Peringatan", "Target wajib diisi"); return; }
    Alert.alert(
      "Konfirmasi Target",
      "Inputan ini akan disimpan sebagai target bulanan, apakah kamu ingin memperbarui target bulan ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Simpan",
          onPress: () => {
            let pesan = "Targetmu realistis semangat, semoga mencapai target.";
            if (val > 1000000) {
              pesan = "Maaf targetmu terlalu besar, silahkan masukkan angka yang realistis";
            } else if (val > 500000) {
              pesan = "Targetmu di atas rata-rata, semangatlah mengejar target.";
            } else if (val >= 300000 && val <= 500000) {
              pesan = "Targetmu realistis semangat, semoga mencapai target.";
            }
            Alert.alert("Hasil Target", pesan);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Input Target Bulanan</Text>
        <Text style={styles.subtitle}>Tentukan target pendapatan bulan ini</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Target Pendapatan (Rp)</Text>
          <TextInput style={styles.input} value={target} onChangeText={setTarget} placeholder="7000000" keyboardType="numeric" />
          <Text style={styles.hint}>Target akan digunakan untuk perhitungan kelas strategi.</Text>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Simpan Target</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "800", color: "#333", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#888", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 18, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  label: { fontSize: 13, fontWeight: "600", color: "#333", marginBottom: 6, marginTop: 8 },
  input: { backgroundColor: "#FFF5F2", borderRadius: 10, padding: 12, color: "#333", borderWidth: 1, borderColor: "#FFD4C8", fontSize: 15 },
  hint: { fontSize: 12, color: "#999", marginTop: 8, marginBottom: 16 },
  button: { backgroundColor: ORANGE, borderRadius: 10, padding: 14, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});