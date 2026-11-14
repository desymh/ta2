import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppData } from "../context/AppDataContext";

const ORANGE = "#EE4D2D";

export default function PendapatanScreen() {
  const { totalGmvThisMonth, monthlyTarget, achievementPercent, historyList } = useAppData();
  const totalKomisi = historyList.reduce((s, h) => s + (Number(h.komisi) || 0), 0);
  const totalVideo = historyList.reduce((s, h) => s + (Number(h.video) || 0), 0);
  const formatRupiah = (v) => "Rp " + Math.round(v || 0).toLocaleString("id-ID");
  const pct = achievementPercent();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Pendapatan</Text>
        <Text style={styles.subtitle}>Total pencapaian bulan ini</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Pencapaian Bulan Ini</Text>
          <Text style={styles.pctBig}>{pct.toFixed(1)}%</Text>
          <Text style={styles.pctText}>
            Pencapaian bulan ini {pct.toFixed(1)}% dari {formatRupiah(monthlyTarget)} (target bulananmu)
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(pct, 100)}%` }]} />
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tercapai (a)</Text>
              <Text style={styles.summaryValue}>{formatRupiah(totalGmvThisMonth)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Target (b)</Text>
              <Text style={styles.summaryValue}>{formatRupiah(monthlyTarget)}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Komisi</Text>
              <Text style={styles.summaryValue}>{formatRupiah(totalKomisi)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Video</Text>
              <Text style={styles.summaryValue}>{totalVideo} video</Text>
            </View>
          </View>
        </View>

        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Rincian Harian</Text>
          {historyList.map((item) => (
            <View key={item.id} style={styles.listRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listDate}>{item.date}</Text>
                <Text style={styles.listMeta}>{item.video} video · {item.status}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.listValue}>{formatRupiah(item.gmv)}</Text>
                <Text style={styles.listSub}>Komisi {formatRupiah(item.komisi)}</Text>
              </View>
            </View>
          ))}
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
  summaryTitle: { color: "#fff", fontSize: 15, fontWeight: "800", marginBottom: 4 },
  pctBig: { color: "#fff", fontSize: 34, fontWeight: "900" },
  pctText: { color: "#FFE0D6", fontSize: 12, marginBottom: 10 },
  progressTrack: { height: 10, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 8, overflow: "hidden", marginBottom: 12 },
  progressFill: { height: "100%", backgroundColor: "#fff", borderRadius: 8 },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 8 },
  summaryItem: { flex: 1, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, padding: 10 },
  summaryLabel: { color: "#FFE0D6", fontSize: 11, marginBottom: 2 },
  summaryValue: { color: "#fff", fontSize: 13, fontWeight: "800" },
  listCard: { backgroundColor: "#fff", borderRadius: 14, padding: 14, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  listTitle: { fontSize: 15, fontWeight: "700", color: "#333", marginBottom: 10 },
  listRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#FFF0EC" },
  listDate: { fontSize: 13, fontWeight: "700", color: "#333" },
  listMeta: { fontSize: 11, color: "#999", marginTop: 2 },
  listValue: { fontSize: 13, fontWeight: "700", color: ORANGE },
  listSub: { fontSize: 11, color: "#888", marginTop: 2 },
});