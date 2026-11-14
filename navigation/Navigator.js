import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import TargetScreen from "../screens/TargetScreen";
import PendapatanScreen from "../screens/PendapatanScreen";
import InputHasilScreen from "../screens/InputHasilScreen";
import HistoriScreen from "../screens/HistoriScreen";
import AnalisisScreen from "../screens/AnalisisScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SeleksiProdukScreen from "../screens/SeleksiProdukScreen";
import { AuthProvider, useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const { signOut } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#EE4D2D" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "700" } }}>
      <Stack.Screen name="Beranda" component={HomeScreen} options={{ title: "Beranda" }} />
      <Stack.Screen name="Target" component={TargetScreen} options={{ title: "Target Bulanan" }} />
      <Stack.Screen name="Pendapatan" component={PendapatanScreen} options={{ title: "Pendapatan" }} />
      <Stack.Screen name="InputHasil" component={InputHasilScreen} options={{ title: "Input Hasil Harian" }} />
      <Stack.Screen name="Histori" component={HistoriScreen} options={{ title: "Histori" }} />
      <Stack.Screen name="Analisis" component={AnalisisScreen} options={{ title: "Analisis Bulanan" }} />
      <Stack.Screen name="SeleksiProduk" component={SeleksiProdukScreen} options={{ title: "Seleksi Produk" }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#EE4D2D" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "700" } }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Masuk" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Daftar" }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#EE4D2D",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderTopColor: "#FFE5DE",
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
            headerStyle: { backgroundColor: "#EE4D2D" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "700" },
          }}
        >
          <Tab.Screen
            name="Beranda"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size || 24}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfileScreen}
            options={{
              title: "Profil",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size || 24}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}