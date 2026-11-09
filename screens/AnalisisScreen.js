import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_MONTHLY_ANALYSIS } from "../data/dummyData";

export default function AnalisisScreen({ navigation }) {
  const { months, gmv, komisi, terjual } = DUMMY_MONTHLY_ANALYSIS;
  const maxGmv = Math.max(...gmv);
  const maxKomisi = Math.max(...komisi);
  const maxTerjual = Math.max(...terjual);

  const formatRupiah = (val) => "Rp " + val.toLocaleString("id-ID");

  const Bar = ({ value, max, color, label }) => {
    const width = max > 0 ? (value / max) * 100 : 0;
    return (
      <View style={styles.barRow}>
        <Text style={styles.barLabel}>{label}</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${width}%`, backgroundColor: color }]} />
        </View>
        <Text style={styles.barValue}>{formatRupiah(value)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Analisis Bulanan</Text>
        <Text style={styles.subtitle}>Perbandingan 3 bulan terakhir</Text>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>GMV</Text>
          {months.map((m, i) => (
            <Bar key={i} value={gmv[i]} max={maxGmv} color="#3498db" label={m} />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Komisi</Text>
          {months.map((m, i) => (
            <Bar key={i} value={komisi[i]} max={maxKomisi} color="#2ecc71" label={m} />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Terjual (Unit)</Text>
          {months.map((m, i) => (
            <Bar key={i} value={terjual[i]} max={maxTerjual} color="#e67e22" label={m} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a252f", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6b7a8d", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  sectionLabel: { fontSize: 14, fontWeight: "700", color: "#2c3e50", marginBottom: 12 },
  barRow: { marginBottom: 12 },
  barLabel: { fontSize: 12, color: "#6b7a8d", marginBottom: 4 },
  barTrack: { height: 20, backgroundColor: "#f1f5f9", borderRadius: 10, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 10 },
  barValue: { fontSize: 12, color: "#34495e", marginTop: 4, fontWeight: "600" },
});