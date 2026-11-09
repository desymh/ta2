import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputHasilScreen({ navigation }) {
  const [gmv, setGmv] = useState("");
  const [komisi, setKomisi] = useState("");
  const [video, setVideo] = useState("");

  const handleSave = () => {
    if (!gmv) {
      Alert.alert("Peringatan", "GMV wajib diisi");
      return;
    }
    Alert.alert("Sukses", "Hasil harian tersimpan (dummy)");
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
  button: { backgroundColor: "#2c3e50", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});