export const DUMMY_USER = {
  id: 1,
  name: "Budi Santoso",
  email: "budi.santoso@email.com",
  phone: "081234567890",
  avatar: null,
};

export const DUMMY_PROFILE = {
  name: "Budi Santoso",
  x_m3: 5000000,
  x_m2: 6000000,
  x_m1: 5500000,
  x_target: 7000000,
};

export const DUMMY_PRODUCTS = [
  { id: 1, name: "Kemeja Flanel", price: 150000, sold_monthly: 40, commission_pct: 10 },
  { id: 2, name: "Celana Jeans", price: 200000, sold_monthly: 25, commission_pct: 12 },
  { id: 3, name: "Jaket Denim", price: 350000, sold_monthly: 15, commission_pct: 15 },
];

export const DUMMY_EVAL = {
  gmv_riil: 2500000,
  komisi_riil: 350000,
  video_riil: 3,
};

export const DUMMY_RESULT = {
  class_label: 1,
  class_label_text: "Kelas 1 - Target Ambisius (Beban Kerja Sedang)",
  daily_mission: "Target harian: upload 3 video, jual 5 unit, GMV Rp 2.300.000",
  growth_ratio: 18.5,
  q_hari: 4.2,
  q_total: 126,
  x1_avg: 216667,
  x2_avg: 26.7,
  x3_avg: 12.3,
  threshold_20: 2.5,
  threshold_40: 5.0,
};

export const DUMMY_HISTORY = [
  { id: 1, date: "2026-11-01", gmv: 2100000, komisi: 280000, video: 2, status: "selesai" },
  { id: 2, date: "2026-11-02", gmv: 2500000, komisi: 350000, video: 3, status: "selesai" },
  { id: 3, date: "2026-11-03", gmv: 1800000, komisi: 220000, video: 2, status: "pending" },
  { id: 4, date: "2026-11-04", gmv: 3000000, komisi: 420000, video: 4, status: "selesai" },
  { id: 5, date: "2026-11-05", gmv: 2200000, komisi: 310000, video: 3, status: "selesai" },
];

export const DUMMY_MONTHLY_ANALYSIS = {
  months: ["Sep", "Okt", "Nov"],
  gmv: [15000000, 18000000, 21000000],
  komisi: [1800000, 2200000, 2600000],
  terjual: [85, 95, 110],
};