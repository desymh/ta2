import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_MONTHLY_ANALYSIS } from "../data/dummyData";

export default function HomeScreen({ navigation }) {
  console.log("[HomeScreen] Rendering");
  const { months, gmv, komisi, terjual } = DUMMY_MONTHLY_ANALYSIS;

  const formatRupiah = (val) =>
    "Rp " + val.toLocaleString("id-ID");

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Beranda</Text>
        <Text style={styles.subtitle}>Ringkasan 3 bulan terakhir</Text>

        <View style={styles.grid}>
          <View style={[styles.gridBox, { borderColor: "#3498db" }]}>
            <Text style={[styles.gridLabel, { color: "#3498db" }]}>GMV</Text>
            {months.map((m, i) => (
              <Text key={i} style={styles.gridItem}>
                {m}: {formatRupiah(gmv[i])}
              </Text>
            ))}
          </View>
          <View style={[styles.gridBox, { borderColor: "#2ecc71" }]}>
            <Text style={[styles.gridLabel, { color: "#2ecc71" }]}>Komisi</Text>
            {months.map((m, i) => (
              <Text key={i} style={styles.gridItem}>
                {m}: {formatRupiah(komisi[i])}
              </Text>
            ))}
          </View>
          <View style={[styles.gridBox, { borderColor: "#e67e22" }]}>
            <Text style={[styles.gridLabel, { color: "#e67e22" }]}>Terjual</Text>
            {months.map((m, i) => (
              <Text key={i} style={styles.gridItem}>
                {m}: {terjual[i]} unit
              </Text>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Menu</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Target")}>
          <Text style={styles.menuIcon}>🎯</Text>
          <View>
            <Text style={styles.menuText}>Input Target Bulanan</Text>
            <Text style={styles.menuDesc}>Atur target pendapatan bulan ini</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Pendapatan")}>
          <Text style={styles.menuIcon}>💰</Text>
          <View>
            <Text style={styles.menuText}>Pendapatan</Text>
            <Text style={styles.menuDesc}>Kelola data pendapatan</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("InputHasil")}>
          <Text style={styles.menuIcon}>📝</Text>
          <View>
            <Text style={styles.menuText}>Input Hasil Harian</Text>
            <Text style={styles.menuDesc}>Catat GMV & komisi harian</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Histori")}>
          <Text style={styles.menuIcon}>📅</Text>
          <View>
            <Text style={styles.menuText}>Histori</Text>
            <Text style={styles.menuDesc}>Riwayat aktivitas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Analisis")}>
          <Text style={styles.menuIcon}>📊</Text>
          <View>
            <Text style={styles.menuText}>Analisis Bulanan</Text>
            <Text style={styles.menuDesc}>Grafik & analisis performa</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a252f", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6b7a8d", marginBottom: 16 },
  grid: { flexDirection: "row", gap: 10, marginBottom: 24 },
  gridBox: { flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: 12, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, borderLeftWidth: 4 },
  gridLabel: { fontSize: 13, fontWeight: "800", marginBottom: 6, textAlign: "center" },
  gridItem: { fontSize: 10, color: "#34495e", marginBottom: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#2c3e50", marginBottom: 12, marginTop: 8 },
  menuItem: { backgroundColor: "#fff", borderRadius: 12, padding: 14, flexDirection: "row", alignItems: "center", marginBottom: 10, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  menuIcon: { fontSize: 24, marginRight: 12 },
  menuText: { fontSize: 15, fontWeight: "700", color: "#1a252f" },
  menuDesc: { fontSize: 12, color: "#6b7a8d", marginTop: 2 },
});