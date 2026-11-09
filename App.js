import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
  FlatList,
  TouchableHighlight,
} from "react-native";

const API_BASE = "http://10.15.90.141:8000";

const CLASS_LABELS = {
  0: "Kelas 0 - Target Realistis (Aman)",
  1: "Kelas 1 - Target Ambisious (Beban Kerja Sedang)",
  2: "Kelas 2 - Target Ekstrem (Risiko Gagal Tinggi)",
};

export default function App() {
  const [screen, setScreen] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    x_m3: "",
    x_m2: "",
    x_m1: "",
    x_target: "",
  });
  const [products, setProducts] = useState([
    { id: 1, name: "", price: "", sold_monthly: "", commission_pct: "" },
  ]);
  const [evalData, setEvalData] = useState({
    gmv_riil: "",
    komisi_riil: "",
    video_riil: "",
  });

  const setField = (obj, key, val) =>
    setProfile({ ...obj, [key]: val });

  const addProduct = () =>
    setProducts([...products, { id: Date.now(), name: "", price: "", sold_monthly: "", commission_pct: "" }]);

  const removeProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  const updateProduct = (id, key, val) =>
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, [key]: val } : p
      )
    );

  const toNum = (v) => (v === "" || v == null ? 0 : parseFloat(v));

  const handleCalculate = async () => {
    const payload = {
      x_m3: toNum(profile.x_m3),
      x_m2: toNum(profile.x_m2),
      x_m1: toNum(profile.x_m1),
      x_target: toNum(profile.x_target),
      products: products.map((p) => ({
        name: p.name || null,
        price: toNum(p.price),
        sold_monthly: toNum(p.sold_monthly),
        commission_pct: toNum(p.commission_pct),
      })),
      daily_evaluation: {
        gmv_riil: toNum(evalData.gmv_riil),
        komisi_riil: toNum(evalData.komisi_riil),
        video_riil: parseInt(evalData.video_riil || "0", 10),
      },
    };

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/calculate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal menghitung strategi");
      const data = await res.json();
      setResult(data);
      setScreen("result");
    } catch (err) {
      setError(err.message);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, value, onChange, keyboard = "numeric", placeholder = "") => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(t) => onChange(t)}
        keyboardType={keyboard}
        placeholder={placeholder}
      />
    </View>
  );

  if (screen === "profile") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Form Profil & Awal Bulan</Text>
          <Text style={styles.subtitle}>Variabel Kendali Finansial Pengguna</Text>

          <View style={styles.card}>
            {renderInput("Nama Lengkap", profile.name, (v) => setField(profile, "name", v), "default-text", "Masukkan nama")}
            {renderInput("X_M-3 Pendapatan 3 Bulan Lalu", profile.x_m3, (v) => setField(profile, "x_m3", v), "numeric", "Rupiah")}
            {renderInput("X_M-2 Pendapatan 2 Bulan Lalu", profile.x_m2, (v) => setField(profile, "x_m2", v), "numeric", "Rupiah")}
            {renderInput("X_M-1 Pendapatan 1 Bulan Lalu", profile.x_m1, (v) => setField(profile, "x_m1", v), "numeric", "Rupiah")}
            {renderInput("X_Target Pendapatan Bulan Ini", profile.x_target, (v) => setField(profile, "x_target", v), "numeric", "Rupiah")}
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={() => setScreen("products")}>
            <Text style={styles.buttonText}>Lanjut ke Input Produk</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "products") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Input Batch Produk</Text>
          <Text style={styles.subtitle}>Metrik Kuantitatif Produk (3-5 produk lintas platform)</Text>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Text style={styles.productTitle}>Produk #{products.indexOf(item) + 1}</Text>
                {renderInput("Nama Produk", item.name, (v) => updateProduct(item.id, "name", v), "default-text", "Nama produk")}
                {renderInput("X_1 Harga Produk", item.price, (v) => updateProduct(item.id, "price", v), "numeric", "Rupiah")}
                {renderInput("X_2 Terjual Bulanan", item.sold_monthly, (v) => updateProduct(item.id, "sold_monthly", v), "numeric", "Unit")}
                {renderInput("X_3 Persentase Komisi", item.commission_pct, (v) => updateProduct(item.id, "commission_pct", v), "numeric", "%")}
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeProduct(item.id)}>
                  <Text style={styles.removeBtnText}>Hapus Produk</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity style={styles.button} onPress={addProduct}>
            <Text style={styles.buttonText}>+ Tambah Produk</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen("profile")}>
              <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setScreen("evaluation")}>
              <Text style={styles.buttonText}>Lanjut ke Evaluasi Harian</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "evaluation") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Evaluasi Kinerja Harian</Text>
          <Text style={styles.subtitle}>Form Masukan Pagi Hari (GMV & Komisi Kemarin)</Text>

          <View style={styles.card}>
            {renderInput("GMV_Riil (Omzet Kotor Kemarin)", evalData.gmv_riil, (v) => setEvalData({ ...evalData, gmv_riil: v }), "numeric", "Rupiah")}
            {renderInput("Komisi_Riil (Komisi Bersih Kemarin)", evalData.komisi_riil, (v) => setEvalData({ ...evalData, komisi_riil: v }), "numeric", "Rupiah")}
            {renderInput("Video_Riil (Video Ter-upload Kemarin)", evalData.video_riil, (v) => setEvalData({ ...evalData, video_riil: v }), "numeric", "Unit")}
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen("products")}>
              <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCalculate}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>HITUNG STRATEGI PENDAPATAN</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "result" && result) {
    const isAndroid = Platform.OS === "android";
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Hasil Strategi Pendapatan</Text>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Kelas Keputusan</Text>
            <Text style={[styles.resultValue, { color: result.class_label === 2 ? "#c0392b" : result.class_label === 1 ? "#d35400" : "#1e8449" }]}>
              {CLASS_LABELS[result.class_label]}
            </Text>
            <Text style={styles.resultLabel}>Misi Harian</Text>
            <Text style={styles.resultMission}>{result.daily_mission}</Text>

            <View style={styles.divider} />
            <Text style={styles.metaLabel}>Rasio Kenaikan Target</Text>
            <Text style={styles.metaValue}>{result.growth_ratio.toFixed(2)}%</Text>

            <Text style={styles.metaLabel}>Beban Kuantitas Jual Harian (Q_hari)</Text>
            <Text style={styles.metaValue}>{result.q_hari.toFixed(2)} unit/hari</Text>

            <Text style={styles.metaLabel}>Total Kuantitas Wajib Bulanan (Q_total)</Text>
            <Text style={styles.metaValue}>{result.q_total.toFixed(2)} unit</Text>

            <Text style={styles.metaLabel}>Rata-rata Harga (X1_avg)</Text>
            <Text style={styles.metaValue}>Rp {result.x1_avg.toLocaleString()}</Text>

            <Text style={styles.metaLabel}>Rata-rata Terjual Bulanan (X2_avg)</Text>
            <Text style={styles.metaValue}>{result.x2_avg.toFixed(2)} unit</Text>

            <Text style={styles.metaLabel}>Rata-rata Komisi (X3_avg)</Text>
            <Text style={styles.metaValue}>{result.x3_avg.toFixed(2)}%</Text>

            <View style={styles.divider} />
            <Text style={styles.metaLabel}>Ambang 20% (threshold_20)</Text>
            <Text style={styles.metaValue}>{result.threshold_20.toFixed(2)}</Text>

            <Text style={styles.metaLabel}>Ambang 40% (threshold_40)</Text>
            <Text style={styles.metaValue}>{result.threshold_40.toFixed(2)}</Text>
          </View>

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen("evaluation")}>
              <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
            {isAndroid ? null : (
              <TouchableOpacity style={styles.button} onPress={() => {
                // placeholder for share/export
              }}>
                <Text style={styles.buttonText}>Export</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a252f", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 13, color: "#6b7a8d", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", color: "#34495e", marginBottom: 6 },
  input: { backgroundColor: "#f1f5f9", borderRadius: 8, padding: 10, color: "#1a252f", borderWidth: 1, borderColor: "#e2e8f0" },
  button: { backgroundColor: "#2c3e50", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  secondaryButton: { backgroundColor: "#e2e8f0", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 8 },
  productCard: { backgroundColor: "#fff", borderRadius: 10, padding: 14, marginBottom: 12, elevation: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  productTitle: { fontSize: 14, fontWeight: "700", color: "#2c3e50", marginBottom: 8 },
  removeBtn: { backgroundColor: "#e74c3c", borderRadius: 8, padding: 8, alignItems: "center", marginTop: 8 },
  removeBtnText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  navRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  resultCard: { backgroundColor: "#fff", borderRadius: 14, padding: 18, marginBottom: 16, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8 },
  resultLabel: { fontSize: 13, fontWeight: "600", color: "#6b7a8d", marginBottom: 4, marginTop: 14 },
  resultValue: { fontSize: 20, fontWeight: "800", color: "#1a252f", textAlign: "center" },
  resultMission: { fontSize: 14, fontWeight: "700", color: "#1a252f", textAlign: "center" },
  divider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 12 },
  metaLabel: { fontSize: 12, fontWeight: "600", color: "#6b7a8d", marginBottom: 2 },
  metaValue: { fontSize: 15, color: "#1a252f", marginBottom: 10 },
  error: { color: "#c0392b", fontWeight: "600", textAlign: "center", marginBottom: 12 },
});
