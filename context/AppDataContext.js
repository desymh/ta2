import React, { createContext, useContext, useMemo, useState } from "react";
import { DUMMY_HISTORY } from "../data/dummyData";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  // b = target bulanan (input user)
  const [monthlyTarget, setMonthlyTargetState] = useState(600000);
  const [targetSetAt, setTargetSetAt] = useState(null); // ISO string
  // info produk terbaik dari Seleksi Produk
  const [bestProduct, setBestProduct] = useState(null);

  const totalGmvThisMonth = useMemo(
    () => DUMMY_HISTORY.reduce((s, h) => s + h.gmv, 0),
    []
  );

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
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
