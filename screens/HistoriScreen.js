import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_HISTORY } from "../data/dummyData";

export default function HistoriScreen({ navigation }) {
  const formatRupiah = (val) => "Rp " + val.toLocaleString("id-ID");

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <View style={[styles.badge, item.status === "selesai" ? styles.badgeSuccess : styles.badgePending]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.historyRow}>
        <Text style={styles.historyLabel}>GMV</Text>
        <Text style={styles.historyValue}>{formatRupiah(item.gmv)}</Text>
      </View>
      <View style={styles.historyRow}>
        <Text style={styles.historyLabel}>Komisi</Text>
        <Text style={styles.historyValue}>{formatRupiah(item.komisi)}</Text>
      </View>
      <View style={styles.historyRow}>
        <Text style={styles.historyLabel}>Video</Text>
        <Text style={styles.historyValue}>{item.video} video</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Histori</Text>
        <Text style={styles.subtitle}>Riwayat aktivitas harian</Text>
        <FlatList data={DUMMY_HISTORY} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} scrollEnabled={false} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a252f", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6b7a8d", marginBottom: 16 },
  historyCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 10, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  historyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  historyDate: { fontSize: 14, fontWeight: "700", color: "#2c3e50" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSuccess: { backgroundColor: "#d5f5e3" },
  badgePending: { backgroundColor: "#fdebd0" },
  badgeText: { fontSize: 11, fontWeight: "700" },
  historyRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  historyLabel: { fontSize: 13, color: "#6b7a8d" },
  historyValue: { fontSize: 13, fontWeight: "600", color: "#1a252f" },
});