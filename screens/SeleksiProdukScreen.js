import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ORANGE = "#EE4D2D";

const emptyProduct = () => ({ name: "", gmv: "", rating: "", komisi: "", terjual: "" });

export default function SeleksiProdukScreen() {
  const [products, setProducts] = useState([emptyProduct(), emptyProduct(), emptyProduct()]);
  const [results, setResults] = useState(null);

  const update = (idx, key, val) => {
    const next = products.map((p, i) => (i === idx ? { ...p, [key]: val } : p));
    setProducts(next);
  };

  const toNum = (v) => {
    const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const handleRank = () => {
    const scored = products.map((p, i) => {
      const gmv = toNum(p.gmv);
      const rating = toNum(p.rating);
      const komisi = toNum(p.komisi);
      const terjual = toNum(p.terjual);
      // Skor sederhana (dummy): GMV + (rating*100000) + (komisi*1000) + (terjual*5000)
      const score = gmv + rating * 100000 + komisi * 1000 + terjual * 5000;
      return {
        ...p,
        idx: i + 1,
        gmv,
        rating,
        komisi,
        terjual,
        score,
        name: p.name?.trim() || `Produk ${i + 1}`,
      };
    });
    scored.sort((a, b) => b.score - a.score);
    setResults(scored.map((p, rank) => ({ ...p, rank: rank + 1 })));
  };

  const formatRupiah = (v) => "Rp " + Math.round(v).toLocaleString("id-ID");

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Seleksi Produk</Text>
        <Text style={styles.subtitle}>Input 3 produk untuk melihat ranking terbaik</Text>

        {products.map((p, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>Produk {i + 1}</Text>
            <Text style={styles.label}>Nama Produk</Text>
            <TextInput style={styles.input} value={p.name} onChangeText={(v) => update(i, "name", v)} placeholder={`Nama produk ${i + 1}`} />
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>GMV (Rp)</Text>
                <TextInput style={styles.input} value={p.gmv} onChangeText={(v) => update(i, "gmv", v)} placeholder="0" keyboardType="numeric" />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Rating (1-5)</Text>
                <TextInput style={styles.input} value={p.rating} onChangeText={(v) => update(i, "rating", v)} placeholder="4.5" keyboardType="numeric" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Komisi (Rp)</Text>
                <TextInput style={styles.input} value={p.komisi} onChangeText={(v) => update(i, "komisi", v)} placeholder="0" keyboardType="numeric" />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Total Terjual</Text>
                <TextInput style={styles.input} value={p.terjual} onChangeText={(v) => update(i, "terjual", v)} placeholder="0" keyboardType="numeric" />
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleRank}>
          <Text style={styles.buttonText}>Lihat Ranking Produk</Text>
        </TouchableOpacity>

        {results && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Hasil Ranking</Text>
            <Text style={styles.resultSub}>Produk terbaik untuk diupload</Text>
            {results.map((r) => (
              <View key={r.idx} style={[styles.rankRow, r.rank === 1 && styles.rankTop]}>
                <View style={[styles.rankBadge, r.rank === 1 && styles.rankBadgeTop]}>
                  <Text style={[styles.rankNum, r.rank === 1 && styles.rankNumTop]}>#{r.rank}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rankName}>{r.name}</Text>
                  <Text style={styles.rankMeta}>GMV {formatRupiah(r.gmv)} · Rating {r.rating || 0} · Komisi {formatRupiah(r.komisi)} · Terjual {r.terjual}</Text>
                  {r.rank === 1 && <Text style={styles.rankBest}>⭐ Paling terbaik untuk diupload</Text>}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 22, fontWeight: "800", color: "#333", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#888", marginBottom: 14 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 12, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: ORANGE, marginBottom: 6 },
  label: { fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 4, marginTop: 8 },
  input: { backgroundColor: "#FFF5F2", borderRadius: 10, padding: 10, color: "#333", borderWidth: 1, borderColor: "#FFD4C8", fontSize: 14 },
  row: { flexDirection: "row", gap: 10 },
  col: { flex: 1 },
  button: { backgroundColor: ORANGE, borderRadius: 12, padding: 14, alignItems: "center", marginTop: 4, marginBottom: 14 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  resultCard: { backgroundColor: "#fff", borderRadius: 14, padding: 14, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  resultTitle: { fontSize: 16, fontWeight: "800", color: "#333" },
  resultSub: { fontSize: 12, color: "#888", marginBottom: 12 },
  rankRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#FFF0EC" },
  rankTop: { backgroundColor: "#FFF5F2", marginHorizontal: -8, paddingHorizontal: 8, borderRadius: 10 },
  rankBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FFE0D6", alignItems: "center", justifyContent: "center", marginRight: 10 },
  rankBadgeTop: { backgroundColor: ORANGE },
  rankNum: { fontWeight: "800", color: ORANGE, fontSize: 13 },
  rankNumTop: { color: "#fff" },
  rankName: { fontSize: 14, fontWeight: "700", color: "#333" },
  rankMeta: { fontSize: 11, color: "#777", marginTop: 2 },
  rankBest: { fontSize: 12, color: ORANGE, fontWeight: "700", marginTop: 4 },
});
