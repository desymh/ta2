import React, { createContext, useState, useContext } from "react";
import { DUMMY_USER, DUMMY_PROFILE, DUMMY_MONTHLY_ANALYSIS } from "../data/dummyData";

const AuthContext = createContext(null);

const INITIAL_USERS = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567890",
    password: "password123",
    hasInputStats: true, // Akun default sudah mengisi statistik
    userProfileStats: {
      x_m3: DUMMY_PROFILE.x_m3,
      x_m2: DUMMY_PROFILE.x_m2,
      x_m1: DUMMY_PROFILE.x_m1,
    },
    monthlyStats: {
      months: DUMMY_MONTHLY_ANALYSIS.months,
      gmv: DUMMY_MONTHLY_ANALYSIS.gmv,
      komisi: DUMMY_MONTHLY_ANALYSIS.komisi,
      terjual: DUMMY_MONTHLY_ANALYSIS.terjual,
    },
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = (email, password) => {
    const cleanEmail = (email || "").trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      throw new Error("Akun dengan email ini belum terdaftar. Silakan daftar akun baru.");
    }
    if (password && found.password && found.password !== password) {
      throw new Error("Password yang kamu masukkan salah.");
    }
    setCurrentUser(found);
    setIsAuthenticated(true);
    return found;
  };

  const signUp = ({ name, email, password, phone }) => {
    const cleanEmail = (email || "").trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error("Email sudah terdaftar. Silakan gunakan email lain atau masuk.");
    }
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : "",
      password,
      hasInputStats: false, // Akun baru WAJIB input statistik saat pertama kali
      userProfileStats: { x_m3: 0, x_m2: 0, x_m1: 0 },
      monthlyStats: null,
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const updateCurrentUserStats = ({ hasInputStats, userProfileStats, monthlyStats }) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      hasInputStats,
      userProfileStats,
      monthlyStats,
    };
    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const signOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        users,
        signIn,
        signUp,
        signOut,
        updateCurrentUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
