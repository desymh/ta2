import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { DUMMY_HISTORY, DUMMY_MONTHLY_ANALYSIS, DUMMY_PROFILE } from "../data/dummyData";
import { useAuth } from "./AuthContext";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const { currentUser, updateCurrentUserStats } = useAuth();

  // b = target bulanan (input user)
  const [monthlyTarget, setMonthlyTargetState] = useState(600000);
  const [targetSetAt, setTargetSetAt] = useState(null); // ISO string
  // info produk terbaik dari Seleksi Produk
  const [bestProduct, setBestProduct] = useState(null);

  // Status input statistik 3 bulan terakhir per user
  const [hasInputStats, setHasInputStats] = useState(
    currentUser ? !!currentUser.hasInputStats : false
  );

  const [userProfileStats, setUserProfileStats] = useState({
    x_m3: currentUser?.userProfileStats?.x_m3 || DUMMY_PROFILE.x_m3,
    x_m2: currentUser?.userProfileStats?.x_m2 || DUMMY_PROFILE.x_m2,
    x_m1: currentUser?.userProfileStats?.x_m1 || DUMMY_PROFILE.x_m1,
  });

  const [monthlyStats, setMonthlyStats] = useState(
    currentUser?.monthlyStats || {
      months: DUMMY_MONTHLY_ANALYSIS.months,
      gmv: [DUMMY_PROFILE.x_m3, DUMMY_PROFILE.x_m2, DUMMY_PROFILE.x_m1],
      komisi: [
        Math.round(DUMMY_PROFILE.x_m3 * 0.1),
        Math.round(DUMMY_PROFILE.x_m2 * 0.1),
        Math.round(DUMMY_PROFILE.x_m1 * 0.1),
      ],
      terjual: [
        Math.round(DUMMY_PROFILE.x_m3 / 5000),
        Math.round(DUMMY_PROFILE.x_m2 / 5000),
        Math.round(DUMMY_PROFILE.x_m1 / 5000),
      ],
    }
  );

  // Sinkronisasi data saat currentUser berubah (ganti akun login / register akun baru)
  useEffect(() => {
    if (currentUser) {
      setHasInputStats(!!currentUser.hasInputStats);
      if (currentUser.monthlyStats) {
        setMonthlyStats(currentUser.monthlyStats);
      } else {
        // Akun baru belum punya data inputan -> reset ke 0 dan tampilkan modal
        setMonthlyStats({
          months: ["Sep", "Okt", "Nov"],
          gmv: [0, 0, 0],
          komisi: [0, 0, 0],
          terjual: [0, 0, 0],
        });
      }

      if (currentUser.userProfileStats) {
        setUserProfileStats(currentUser.userProfileStats);
      }
    } else {
      setHasInputStats(false);
    }
  }, [currentUser]);

  const saveMonthlyStats = ({ x_m3, x_m2, x_m1 }) => {
    const valM3 = parseInt(String(x_m3).replace(/[^0-9]/g, ""), 10) || 0;
    const valM2 = parseInt(String(x_m2).replace(/[^0-9]/g, ""), 10) || 0;
    const valM1 = parseInt(String(x_m1).replace(/[^0-9]/g, ""), 10) || 0;

    const gmv = [valM3, valM2, valM1];
    const komisi = gmv.map((v) => Math.round(v * 0.1));
    const terjual = gmv.map((v) => Math.round(v / 5000));

    const newStats = {
      months: ["Sep", "Okt", "Nov"],
      gmv,
      komisi,
      terjual,
    };
    const newProfileStats = { x_m3: valM3, x_m2: valM2, x_m1: valM1 };

    setMonthlyStats(newStats);
    setUserProfileStats(newProfileStats);
    setHasInputStats(true);

    // Simpan ke akun user saat ini agar ketika login lagi tidak diminta input ulang
    if (updateCurrentUserStats) {
      updateCurrentUserStats({
        hasInputStats: true,
        userProfileStats: newProfileStats,
        monthlyStats: newStats,
      });
    }
  };

  const [historyList, setHistoryList] = useState(DUMMY_HISTORY);

  const totalGmvThisMonth = useMemo(
    () => historyList.reduce((s, h) => s + (Number(h.gmv) || 0), 0),
    [historyList]
  );

  const addDailyResult = ({ gmv, komisi, video, date }) => {
    const valGmv = parseInt(String(gmv).replace(/[^0-9]/g, ""), 10) || 0;
    const valKomisi = parseInt(String(komisi).replace(/[^0-9]/g, ""), 10) || Math.round(valGmv * 0.1);
    const valVideo = parseInt(String(video).replace(/[^0-9]/g, ""), 10) || 0;

    const newEntry = {
      id: Date.now(),
      date: date || new Date().toISOString().split("T")[0],
      gmv: valGmv,
      komisi: valKomisi,
      video: valVideo,
      status: "selesai",
    };
    setHistoryList((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const setMonthlyTarget = (value) => {
    setMonthlyTargetState(value);
    setTargetSetAt(new Date().toISOString());
  };

  const daysSinceTargetSet = () => {
    if (!targetSetAt) return Infinity;
    const diff = Date.now() - new Date(targetSetAt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const canSetTarget = () => daysSinceTargetSet() >= 28;
  const daysUntilCanSet = () => {
    if (!targetSetAt) return 0;
    const left = 28 - daysSinceTargetSet();
    return left > 0 ? left : 0;
  };

  const achievementPercent = () => {
    if (!monthlyTarget || monthlyTarget <= 0) return 0;
    return (totalGmvThisMonth / monthlyTarget) * 100;
  };

  const value = {
    monthlyTarget,
    targetSetAt,
    setMonthlyTarget,
    canSetTarget,
    daysUntilCanSet,
    daysSinceTargetSet,
    totalGmvThisMonth,
    achievementPercent,
    bestProduct,
    setBestProduct,
    hasInputStats,
    setHasInputStats,
    userProfileStats,
    monthlyStats,
    saveMonthlyStats,
    historyList,
    addDailyResult,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
