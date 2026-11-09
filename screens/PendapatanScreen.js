import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ORANGE = "#EE4D2D";

export default function PendapatanScreen() {
  const [gmv, setGmv] = useState("2500000");
  const [komisi, setKomisi] = useState("350000");
  const [video, setVideo] = useState("3");

  const handleSave = () => {
    if (!gmv) { Alert.alert("Peringatan", "GMV wajib diisi"); return; }
    Alert.alert("Sukses", "Data pendapatan tersimpan (dummy)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Pendapatan</Text>
        <Text style={styles.subtitle}>Input data pendapatan harian</Text>
        <View style={styles.card}>
          <Text style={styles.label}>GMV Hari Ini (Rp)</Text>
          <TextInput style={styles.input} value={gmv} onChangeText={setGmv} placeholder="2500000" keyboardType="numeric" />
          <Text style={styles.label}>Komisi Hari Ini (Rp)</Text>
          <TextInput style={styles.input} value={komisi} onChangeText={setKomisi} placeholder="350000" keyboardType="numeric" />
          <Text style={styles.label}>Jumlah Video Upload</Text>
          <TextInput style={styles.input} value={video} onChangeText={setVideo} placeholder="3" keyboardType="numeric" />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Simpan</Text>
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
  label: { fontSize: 13, fontWeight: "600", color: "#333", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#FFF5F2", borderRadius: 10, padding: 12, color: "#333", borderWidth: 1, borderColor: "#FFD4C8", fontSize: 15 },
  button: { backgroundColor: ORANGE, borderRadius: 10, padding: 14, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});