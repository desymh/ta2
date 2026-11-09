import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_HISTORY } from "../data/dummyData";

const ORANGE = "#EE4D2D";

export default function PendapatanScreen() {
  const [gmv, setGmv] = useState("2500000");
  const [komisi, setKomisi] = useState("350000");
  const [video, setVideo] = useState("3");

  const totalGmv = DUMMY_HISTORY.reduce((s, h) => s + h.gmv, 0);
  const totalKomisi = DUMMY_HISTORY.reduce((s, h) => s + h.komisi, 0);
  const totalVideo = DUMMY_HISTORY.reduce((s, h) => s + h.video, 0);
  const formatRupiah = (v) => "Rp " + v.toLocaleString("id-ID");

  const handleSave = () => {
    if (!gmv) { Alert.alert("Peringatan", "GMV wajib diisi"); return; }
    Alert.alert("Sukses", "Data pendapatan tersimpan (dummy)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Pendapatan</Text>
        <Text style={styles.subtitle}>Total pencapaian bulan ini (dummy)</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Bulan Ini</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>GMV</Text>
              <Text style={styles.summaryValue}>{formatRupiah(totalGmv)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Komisi</Text>
              <Text style={styles.summaryValue}>{formatRupiah(totalKomisi)}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Video</Text>
              <Text style={styles.summaryValue}>{totalVideo} video</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Hari Tercatat</Text>
              <Text style={styles.summaryValue}>{DUMMY_HISTORY.length} hari</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Input Pendapatan Hari Ini</Text>
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
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "800", color: "#333", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#888", marginBottom: 14 },
  summaryCard: { backgroundColor: ORANGE, borderRadius: 14, padding: 16, marginBottom: 14 },
  summaryTitle: { color: "#fff", fontSize: 15, fontWeight: "800", marginBottom: 12 },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 8 },
  summaryItem: { flex: 1, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, padding: 10 },
  summaryLabel: { color: "#FFE0D6", fontSize: 11, marginBottom: 2 },
  summaryValue: { color: "#fff", fontSize: 13, fontWeight: "800" },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 18, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#333", marginBottom: 4 },
  label: { fontSize: 13, fontWeight: "600", color: "#333", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#FFF5F2", borderRadius: 10, padding: 12, color: "#333", borderWidth: 1, borderColor: "#FFD4C8", fontSize: 15 },
  button: { backgroundColor: ORANGE, borderRadius: 10, padding: 14, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});