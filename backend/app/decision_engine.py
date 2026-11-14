from typing import List, Optional, Tuple
from app.schemas import ProductBase, DailyEvaluationBase


CLASS_0_NAME = "Target Realistis (Aman)"
CLASS_1_NAME = "Target Ambisious (Beban Kerja Sedang)"
CLASS_2_NAME = "Target Ekstrem (Risiko Gagal Tinggi)"

MISSION_0 = "Baseline Standar Kreator (Wajib Minimal 3 Video / Hari)"
MISSION_1 = "Kerja Menengah (Wajib 4-5 Video / Hari menyebar di jam prime time)"
MISSION_2 = "Kerja Keras Ekstrem (Wajib 5 Video / Hari + Sesi Live Streaming 1-2 Jam)"


def compute_x_lalu_avg(x_m3: float, x_m2: float, x_m1: float) -> float:
    return (x_m3 + x_m2 + x_m1) / 3.0


def compute_growth_ratio(x_target: float, x_lalu_avg: float) -> float:
    return (x_target / x_lalu_avg) * 100.0


def compute_feature_averages(products: List[ProductBase], n: int) -> Tuple[float, float, float]:
    if n == 0:
        return 0.0, 0.0, 0.0
    x1_sum = sum(p.price for p in products)
    x2_sum = sum(p.sold_monthly for p in products)
    x3_sum = sum(p.commission_pct for p in products)
    return x1_sum / n, x2_sum / n, x3_sum / n


def compute_q_hari(x_target: float, x1_avg: float, x3_avg: float, x2_avg: float) -> Tuple[float, float, float]:
    c_unit = x1_avg * (x3_avg / 100.0)
    q_total = x_target / c_unit if c_unit > 0 else 0.0
    q_hari = q_total / 30.0
    return c_unit, q_total, q_hari


def classify(growth_ratio: float, q_hari: float, x2_avg: float) -> Tuple[int, str, str]:
    daily_volume_avg = x2_avg / 30.0
    threshold_20 = daily_volume_avg * 0.20
    threshold_40 = daily_volume_avg * 0.40

    if growth_ratio <= 300.0 and q_hari <= threshold_20:
        return 0, CLASS_0_NAME, MISSION_0
    if (301.0 <= growth_ratio <= 500.0) or (threshold_20 < q_hari <= threshold_40):
        return 1, CLASS_1_NAME, MISSION_1
    return 2, CLASS_2_NAME, MISSION_2


def run_decision_engine(
    x_m3: float,
    x_m2: float,
    x_m1: float,
    x_target: float,
    products: List[ProductBase],
    daily_evaluation: Optional[DailyEvaluationBase] = None,
) -> dict:
    n = len(products)

    x_lalu_avg = compute_x_lalu_avg(x_m3, x_m2, x_m1)
    growth_ratio = compute_growth_ratio(x_target, x_lalu_avg)
    x1_avg, x2_avg, x3_avg = compute_feature_averages(products, n)
    c_unit, q_total, q_hari = compute_q_hari(x_target, x1_avg, x3_avg, x2_avg)
    class_label, class_name, daily_mission = classify(growth_ratio, q_hari, x2_avg)

    daily_volume_avg = x2_avg / 30.0
    threshold_20 = daily_volume_avg * 0.20
    threshold_40 = daily_volume_avg * 0.40

    return {
        "x_lalu_avg": x_lalu_avg,
        "growth_ratio": growth_ratio,
        "x1_avg": x1_avg,
        "x2_avg": x2_avg,
        "x3_avg": x3_avg,
        "c_unit": c_unit,
        "q_total": q_total,
        "q_hari": q_hari,
        "threshold_20": threshold_20,
        "threshold_40": threshold_40,
        "class_label": class_label,
        "class_name": class_name,
        "daily_mission": daily_mission,
    }
