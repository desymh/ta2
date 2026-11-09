import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_USER } from "../data/dummyData";
import { useAuth } from "../context/AuthContext";

const ORANGE = "#EE4D2D";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const user = DUMMY_USER;

  const handleLogout = () => {
    Alert.alert("Keluar", "Yakin ingin keluar?", [
      { text: "Batal" },
      { text: "Keluar", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.profilePhone}>{user.phone}</Text>
        </View>

        <View style={styles.card}>
          <MenuItem icon="⚙️" label="Pengaturan Akun" onPress={() => Alert.alert("Info", "Fitur segera hadir")} />
          <MenuItem icon="🔔" label="Notifikasi" onPress={() => Alert.alert("Info", "Fitur segera hadir")} />
          <MenuItem icon="❓" label="Bantuan" onPress={() => Alert.alert("Info", "Fitur segera hadir")} />
          <MenuItem icon="ℹ️" label="Tentang Aplikasi" onPress={() => Alert.alert("Info", "Portfolio Decision Support v1.0")} />
          <MenuItem icon="🚪" label="Keluar" onPress={handleLogout} isLast danger />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, label, onPress, isLast, danger }) => (
  <TouchableOpacity style={[styles.menuItem, isLast && styles.menuItemLast]} onPress={onPress}>
    <View style={[styles.menuIconWrap, danger && styles.menuIconDanger]}>
      <Text style={styles.menuIcon}>{icon}</Text>
    </View>
    <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F2" },
  scroll: { padding: 16, paddingBottom: 30 },
  profileHeader: { alignItems: "center", paddingVertical: 28, backgroundColor: ORANGE, borderRadius: 16, marginBottom: 16 },
  avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  avatarText: { color: ORANGE, fontSize: 30, fontWeight: "900" },
  profileName: { fontSize: 20, fontWeight: "800", color: "#fff", marginBottom: 2 },
  profileEmail: { fontSize: 13, color: "#FFE0D6" },
  profilePhone: { fontSize: 12, color: "#FFD4C8", marginTop: 2 },
  card: { backgroundColor: "#fff", borderRadius: 14, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 14, borderBottomWidth: 1, borderBottomColor: "#FFF0EC" },
  menuItemLast: { borderBottomWidth: 0 },
  menuIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#FFF5F2", alignItems: "center", justifyContent: "center", marginRight: 12 },
  menuIconDanger: { backgroundColor: "#FFEBEE" },
  menuIcon: { fontSize: 18 },
  menuLabel: { flex: 1, fontSize: 15, color: "#333", fontWeight: "600" },
  menuLabelDanger: { color: "#D32F2F" },
  menuArrow: { fontSize: 22, color: "#ccc" },
});