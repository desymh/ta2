import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

const ORANGE = "#EE4D2D";
const ORANGE_LIGHT = "#FFF5F2";

export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const {
    monthlyTarget,
    totalGmvThisMonth,
    achievementPercent,
    hasInputStats,
    monthlyStats,
    userProfileStats,
    saveMonthlyStats,
  } = useAppData();

  const { months, gmv, komisi, terjual } = monthlyStats;
  const formatRupiah = (val) => "Rp " + Math.round(val || 0).toLocaleString("id-ID");
  const pct = achievementPercent();

  // State modal input statistik pertama kali login
  const [modalVisible, setModalVisible] = useState(!hasInputStats);
  const [inputM3, setInputM3] = useState(
    userProfileStats.x_m3 ? String(userProfileStats.x_m3) : ""
  );
  const [inputM2, setInputM2] = useState(
    userProfileStats.x_m2 ? String(userProfileStats.x_m2) : ""
  );
  const [inputM1, setInputM1] = useState(
    userProfileStats.x_m1 ? String(userProfileStats.x_m1) : ""
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setModalVisible(!hasInputStats);
    if (!hasInputStats) {
      setInputM3(userProfileStats.x_m3 ? String(userProfileStats.x_m3) : "");
      setInputM2(userProfileStats.x_m2 ? String(userProfileStats.x_m2) : "");
      setInputM1(userProfileStats.x_m1 ? String(userProfileStats.x_m1) : "");
    }
  }, [hasInputStats, currentUser]);

  const handleOpenEdit = () => {
    setInputM3(String(userProfileStats.x_m3 || gmv[0] || ""));
    setInputM2(String(userProfileStats.x_m2 || gmv[1] || ""));
    setInputM1(String(userProfileStats.x_m1 || gmv[2] || ""));
    setErrorMsg("");
    setModalVisible(true);
  };

  const handleSaveModal = () => {
    setErrorMsg("");
    const cleanM3 = parseInt(String(inputM3).replace(/[^0-9]/g, ""), 10) || 0;
    const cleanM2 = parseInt(String(inputM2).replace(/[^0-9]/g, ""), 10) || 0;
    const cleanM1 = parseInt(String(inputM1).replace(/[^0-9]/g, ""), 10) || 0;

    if (!cleanM3 || !cleanM2 || !cleanM1) {
      setErrorMsg("Semua 3 statistik pendapatan bulan terakhir wajib diisi.");
      return;
    }

    saveMonthlyStats({ x_m3: cleanM3, x_m2: cleanM2, x_m1: cleanM1 });
    setModalVisible(false);
    Alert.alert(
      "Berhasil Disimpan",
      "Statistik 3 bulan terakhir berhasil disimpan. Ketiga card statistik di beranda telah diperbarui!"
    );
  };

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
          <Text style={styles.headerTitle}>Pencapaian Bulan Ini</Text>
          <Text style={styles.pctBig}>{pct.toFixed(1)}%</Text>
          <Text style={styles.headerSubtitle}>
            Pencapaian bulan ini {pct.toFixed(1)}% dari {formatRupiah(monthlyTarget)}
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(pct, 100)}%` }]} />
          </View>
          <View style={styles.missionBox}>
            <Text style={styles.missionText}>
              Tercapai (a): {formatRupiah(totalGmvThisMonth)}  ·  Target (b): {formatRupiah(monthlyTarget)}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Statistik 3 Bulan Terakhir</Text>
          <TouchableOpacity onPress={handleOpenEdit} style={styles.editBtn}>
            <Text style={styles.editBtnText}>{hasInputStats ? "Ubah" : "Input Wajib"}</Text>
          </TouchableOpacity>
        </View>

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

      {/* Modal Wajib Input Statistik Pendapatan 3 Bulan Terakhir */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          if (hasInputStats) setModalVisible(false);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalBadge}>
                <Text style={styles.modalBadgeText}>Wajib Diisi Pertama Kali</Text>
              </View>
              <Text style={styles.modalTitle}>Statistik 3 Bulan Sebelumnya</Text>
              <Text style={styles.modalSubtitle}>
                Halo {currentUser?.name ? `${currentUser.name}, ` : ""}masukkan riwayat pendapatanmu selama 3 bulan sebelumnya. Setelah disimpan, kamu tidak perlu mengisinya lagi saat login berikutnya.
              </Text>

              {errorMsg ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
                </View>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>1. Pendapatan 3 Bulan Lalu ({months[0] || "Bulan 3"})</Text>
                <View style={styles.inputWrap}>
                  <Text style={styles.inputPrefix}>Rp</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Contoh: 420000"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={inputM3}
                    onChangeText={setInputM3}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>2. Pendapatan 2 Bulan Lalu ({months[1] || "Bulan 2"})</Text>
                <View style={styles.inputWrap}>
                  <Text style={styles.inputPrefix}>Rp</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Contoh: 550000"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={inputM2}
                    onChangeText={setInputM2}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>3. Pendapatan 1 Bulan Lalu ({months[2] || "Bulan 1"})</Text>
                <View style={styles.inputWrap}>
                  <Text style={styles.inputPrefix}>Rp</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Contoh: 480000"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={inputM1}
                    onChangeText={setInputM1}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveModal} activeOpacity={0.85}>
                <Text style={styles.saveBtnText}>Simpan & Tampilkan Card</Text>
              </TouchableOpacity>

              {hasInputStats ? (
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>Batal</Text>
                </TouchableOpacity>
              ) : null}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 14, paddingBottom: 28 },
  headerCard: { backgroundColor: ORANGE, borderRadius: 16, padding: 16, marginBottom: 16 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#fff", marginBottom: 2 },
  pctBig: { fontSize: 34, fontWeight: "900", color: "#fff" },
  headerSubtitle: { fontSize: 12, color: "#FFE0D6", marginBottom: 10 },
  progressTrack: { height: 10, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 8, overflow: "hidden", marginBottom: 10 },
  progressFill: { height: "100%", backgroundColor: "#fff", borderRadius: 8 },
  missionBox: { backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, padding: 10 },
  missionText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 4 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#333" },
  editBtn: { backgroundColor: "#FFE5DE", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  editBtnText: { color: ORANGE, fontSize: 11, fontWeight: "700" },
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

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFE5DE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  modalBadgeText: {
    color: ORANGE,
    fontSize: 11,
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#222",
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFD4C8",
    paddingHorizontal: 12,
  },
  inputPrefix: {
    fontSize: 14,
    fontWeight: "700",
    color: ORANGE,
    marginRight: 6,
  },
  modalInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  cancelBtn: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 6,
  },
  cancelBtnText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "600",
  },
});