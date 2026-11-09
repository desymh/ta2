import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DUMMY_USER } from "../data/dummyData";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const user = DUMMY_USER;

  const handleLogout = () => {
    Alert.alert("Keluar", "Yakin ingin keluar?", [
      { text: "Batal" },
      { text: "Keluar", onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
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
          <MenuItem icon="ℹ️" label="Tentang Aplikasi" onPress={() => Alert.alert("Info", "Fitur segera hadir")} />
          <MenuItem icon="🚪" label="Keluar" onPress={handleLogout} isLast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, label, onPress, isLast }) => (
  <TouchableOpacity style={[styles.menuItem, isLast && styles.menuItemLast]} onPress={onPress}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scroll: { padding: 16, paddingBottom: 30 },
  profileHeader: { alignItems: "center", paddingVertical: 30, backgroundColor: "#fff", borderRadius: 16, marginBottom: 20, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  profileName: { fontSize: 20, fontWeight: "bold", color: "#1a252f", marginBottom: 4 },
  profileEmail: { fontSize: 14, color: "#6b7a8d", marginBottom: 2 },
  profilePhone: { fontSize: 13, color: "#95a5a6", marginTop: 4 },
  card: { backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  menuItemLast: { borderBottomWidth: 0 },
  menuIcon: { fontSize: 22, marginRight: 14, width: 28 },
  menuLabel: { flex: 1, fontSize: 15, color: "#1a252f" },
  menuArrow: { fontSize: 24, color: "#bdc3c7" },
});