import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import TargetScreen from "../screens/TargetScreen";
import PendapatanScreen from "../screens/PendapatanScreen";
import InputHasilScreen from "../screens/InputHasilScreen";
import HistoriScreen from "../screens/HistoriScreen";
import AnalisisScreen from "../screens/AnalisisScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#EE4D2D", tabBarInactiveTintColor: "#999", headerStyle: { backgroundColor: "#EE4D2D" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "700" } }}>
          <Tab.Screen name="Beranda" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Pencapaian" component={HomeScreen} options={{ title: "Pencapaian" }} />
          <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: "Profil" }} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}