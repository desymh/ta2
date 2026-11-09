import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_MONTHLY_ANALYSIS } from "../data/dummyData";

const ORANGE = "#EE4D2D";

export default function AnalisisScreen() {
  const { months, gmv, komisi, terjual } = DUMMY_MONTHLY_ANALYSIS;
  const maxGmv = Math.max(...gmv);
  const maxKomisi = Math.max(...komisi);
  const maxTerjual = Math.max(...terjual);
  const formatRupiah = (val) => "Rp " + val.toLocaleString("id-ID");

  const Bar = ({ value, max, color, label, suffix = "" }) => {
    const width = max > 0 ? (value / max) * 100 : 0;
    return (
      <View style={styles.barRow}>
        <View style={styles.barMeta}>
          <Text style={styles.barLabel}>{label}</Text>
          <Text style={styles.barValue}>{suffix ? value + suffix : formatRupiah(value)}</Text>
        </View>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${width}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Analisis Bulanan</Text>
        <Text style={styles.subtitle}>Perbandingan 3 bulan terakhir</Text>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>GMV</Text>
          {months.map((m, i) => <Bar key={i} value={gmv[i]} max={maxGmv} color={ORANGE} label={m} />)}
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Komisi</Text>
          {months.map((m, i) => <Bar key={i} value={komisi[i]} max={maxKomisi} color="#FF8A50" label={m} />)}
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Terjual (Unit)</Text>
          {months.map((m, i) => <Bar key={i} value={terjual[i]} max={maxTerjual} color="#FFB74D" label={m} suffix=" unit" />)}
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
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  sectionLabel: { fontSize: 15, fontWeight: "700", color: "#333", marginBottom: 12 },
  barRow: { marginBottom: 12 },
  barMeta: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  barLabel: { fontSize: 12, color: "#888" },
  barTrack: { height: 12, backgroundColor: "#FFF0EC", borderRadius: 8, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 8 },
  barValue: { fontSize: 11, color: "#555", fontWeight: "600" },
});