import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_MONTHLY_ANALYSIS, DUMMY_RESULT } from "../data/dummyData";

const ORANGE = "#EE4D2D";
const ORANGE_LIGHT = "#FFF5F2";
const ORANGE_DARK = "#D73211";

export default function HomeScreen({ navigation }) {
  const { months, gmv, komisi, terjual } = DUMMY_MONTHLY_ANALYSIS;
  const formatRupiah = (val) => "Rp " + val.toLocaleString("id-ID");

  const menus = [
    { icon: "🏆", label: "Seleksi Produk", desc: "Ranking produk", screen: "SeleksiProduk" },
    { icon: "🎯", label: "Target", desc: "Target bulanan", screen: "Target" },
    { icon: "💰", label: "Pendapatan", desc: "Hasil bulanan", screen: "Pendapatan" },
    { icon: "📝", label: "Input Harian", desc: "Catat hasil", screen: "InputHasil" },
    { icon: "📅", label: "Histori", desc: "Riwayat aktivitas", screen: "Histori" },
    { icon: "📊", label: "Analisis", desc: "Grafik performa", screen: "Analisis" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Ringkasan Bulan Ini</Text>
          <Text style={styles.headerSubtitle}>Status: {DUMMY_RESULT.class_label_text}</Text>
          <View style={styles.missionBox}>
            <Text style={styles.missionText}>{DUMMY_RESULT.daily_mission}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Statistik 3 Bulan Terakhir</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderTopColor: ORANGE }]}>
            <Text style={[styles.statLabel, { color: ORANGE }]}>GMV</Text>
            {months.map((m, i) => (
              <Text key={i} style={styles.statItem}>{m}: {formatRupiah(gmv[i])}</Text>
            ))}
          </View>
          <View style={[styles.statCard, { borderTopColor: "#FF8A50" }]}>
            <Text style={[styles.statLabel, { color: "#FF8A50" }]}>Komisi</Text>
            {months.map((m, i) => (
              <Text key={i} style={styles.statItem}>{m}: {formatRupiah(komisi[i])}</Text>
            ))}
          </View>
          <View style={[styles.statCard, { borderTopColor: "#FFB74D" }]}>
            <Text style={[styles.statLabel, { color: "#FFB74D" }]}>Terjual</Text>
            {months.map((m, i) => (
              <Text key={i} style={styles.statItem}>{m}: {terjual[i]} unit</Text>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Menu Utama</Text>
        <View style={styles.grid}>
          {menus.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>
              <Text style={styles.gridLabel}>{item.label}</Text>
              <Text style={styles.gridDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 14, paddingBottom: 28 },
  headerCard: { backgroundColor: ORANGE, borderRadius: 16, padding: 16, marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#fff", marginBottom: 4 },
  headerSubtitle: { fontSize: 12, color: "#FFE0D6", marginBottom: 10 },
  missionBox: { backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, padding: 10 },
  missionText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#333", marginBottom: 10, marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  statCard: { flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: 10, borderTopWidth: 3, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  statLabel: { fontSize: 12, fontWeight: "800", marginBottom: 6, textAlign: "center" },
  statItem: { fontSize: 9, color: "#555", marginBottom: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  gridItem: { width: "31%", backgroundColor: "#fff", borderRadius: 14, paddingVertical: 14, paddingHorizontal: 8, alignItems: "center", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: ORANGE_LIGHT, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  iconText: { fontSize: 22 },
  gridLabel: { fontSize: 12, fontWeight: "700", color: "#333", textAlign: "center" },
  gridDesc: { fontSize: 9, color: "#999", textAlign: "center", marginTop: 2 },
});