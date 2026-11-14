import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppData } from "../context/AppDataContext";

const ORANGE = "#EE4D2D";

export default function InputHasilScreen({ navigation }) {
  const { addDailyResult } = useAppData();
  const [gmv, setGmv] = useState("");
  const [komisi, setKomisi] = useState("");
  const [video, setVideo] = useState("");

  const handleSave = () => {
    const cleanGmv = parseInt(String(gmv).replace(/[^0-9]/g, ""), 10) || 0;
    if (!cleanGmv) {
      Alert.alert("Peringatan", "GMV wajib diisi dengan nominal angka lebih dari 0.");
      return;
    }
    const cleanKomisi = parseInt(String(komisi).replace(/[^0-9]/g, ""), 10) || Math.round(cleanGmv * 0.1);
    const cleanVideo = parseInt(String(video).replace(/[^0-9]/g, ""), 10) || 0;

    addDailyResult({
      gmv: cleanGmv,
      komisi: cleanKomisi,
      video: cleanVideo,
    });

    Alert.alert(
      "Sukses",
      "Hasil harian berhasil disimpan! Pencapaian bulan ini dan histori aktivitas telah diperbarui.",
      [
        {
          text: "Lihat Histori",
          onPress: () => {
            setGmv("");
            setKomisi("");
            setVideo("");
            navigation.navigate("Histori");
          },
        },
        {
          text: "OK",
          onPress: () => {
            setGmv("");
            setKomisi("");
            setVideo("");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Input Hasil Harian</Text>
        <Text style={styles.subtitle}>Catat hasil kemarin</Text>
        <View style={styles.card}>
          <Text style={styles.label}>GMV (Rp)</Text>
          <TextInput style={styles.input} value={gmv} onChangeText={setGmv} placeholder="0" keyboardType="numeric" />
          <Text style={styles.label}>Komisi (Rp)</Text>
          <TextInput style={styles.input} value={komisi} onChangeText={setKomisi} placeholder="0" keyboardType="numeric" />
          <Text style={styles.label}>Jumlah Video</Text>
          <TextInput style={styles.input} value={video} onChangeText={setVideo} placeholder="0" keyboardType="numeric" />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Simpan Hasil</Text>
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