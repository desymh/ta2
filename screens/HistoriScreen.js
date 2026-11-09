import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_HISTORY } from "../data/dummyData";

const ORANGE = "#EE4D2D";

export default function HistoriScreen() {
  const formatRupiah = (val) => "Rp " + val.toLocaleString("id-ID");

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <View style={[styles.badge, item.status === "selesai" ? styles.badgeSuccess : styles.badgePending]}>
          <Text style={[styles.badgeText, item.status === "selesai" ? styles.badgeTextOk : styles.badgeTextPend]}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.historyRow}><Text style={styles.historyLabel}>GMV</Text><Text style={styles.historyValue}>{formatRupiah(item.gmv)}</Text></View>
      <View style={styles.historyRow}><Text style={styles.historyLabel}>Komisi</Text><Text style={styles.historyValue}>{formatRupiah(item.komisi)}</Text></View>
      <View style={styles.historyRow}><Text style={styles.historyLabel}>Video</Text><Text style={styles.historyValue}>{item.video} video</Text></View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Histori</Text>
        <Text style={styles.subtitle}>Riwayat aktivitas harian</Text>
        <FlatList data={DUMMY_HISTORY} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} scrollEnabled={false} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "800", color: "#333", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#888", marginBottom: 14 },
  historyCard: { backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, borderLeftWidth: 4, borderLeftColor: ORANGE },
  historyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  historyDate: { fontSize: 14, fontWeight: "700", color: "#333" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSuccess: { backgroundColor: "#E8F5E9" },
  badgePending: { backgroundColor: "#FFF3E0" },
  badgeText: { fontSize: 11, fontWeight: "700" },
  badgeTextOk: { color: "#2E7D32" },
  badgeTextPend: { color: ORANGE },
  historyRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  historyLabel: { fontSize: 13, color: "#888" },
  historyValue: { fontSize: 13, fontWeight: "600", color: "#333" },
});