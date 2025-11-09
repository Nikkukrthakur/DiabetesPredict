from typing import Dict

# The order your model most likely expects (Pima-style):
# Adjust if your pickle was trained on a different order.
CLINICAL_KEYS = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age",
]

def midpoints(option: str, mapping: Dict[str, float], default=0.0) -> float:
    return mapping.get(option, default)

def map_quiz_to_clinical(answers: Dict[str, str]) -> Dict[str, float]:
    """
    Heuristic mapping from lifestyle answers to clinical estimates.
    Tweak freely to better fit your dataset/distribution.
    """
    # ---- Parse numeric-like fields ----
    age = float(answers.get("age", "30") or 30)
    preg = float(answers.get("pregnancies", "0") or 0)
    gender = answers.get("gender", "Male")

    # ---- Lifestyle encodings -> helper numbers ----
    smoking_cigs = midpoints(answers.get("smoking", "None"), {
        "None": 0, "1-3": 2, "4-7": 5, "8-10": 9, "10+": 12
    }, 0)

    alcohol_pw = midpoints(answers.get("alcohol", "Never"), {
        "Never": 0, "Occasionally (1–2/week)": 1.5,
        "Regularly (3–5/week)": 4, "Daily": 7
    }, 0)

    exercise_min = midpoints(answers.get("exercise", "None"), {
        "None": 0, "<15 mins": 10, "15-30 mins": 25, "30-60 mins": 45, "1+ hour": 70
    }, 0)

    diet_score = midpoints(answers.get("diet", "Average"), {
        # Higher is better
        "High sugar/junk food": 0, "Average": 1, "Healthy": 2
    }, 1)

    water_l = midpoints(answers.get("water", "1-2L"), {
        "<1L": 0.7, "1-2L": 1.5, "2-3L": 2.5, "3+L": 3.5
    }, 1.5)

    sleep_h = midpoints(answers.get("sleep", "6-8 hrs"), {
        "<4 hrs": 3.5, "4-6 hrs": 5, "6-8 hrs": 7, "8+ hrs": 8.5
    }, 7)

    meals_reg = midpoints(answers.get("meals", "Mostly"), {
        # regularity (higher = better)
        "Never": 0, "Rarely": 1, "Mostly": 2, "Always": 3
    }, 2)

    sugar_freq = midpoints(answers.get("sugarIntake", "1–2/week"), {
        "Rarely": 0.5, "1–2/week": 1.5, "3–5/week": 4, "Daily": 7
    }, 1.5)

    stress_lvl = midpoints(answers.get("stress", "Moderate"), {
        "Low": 0, "Moderate": 1, "High": 2, "Very High": 3
    }, 1)

    screen_h = midpoints(answers.get("screenTime", "1–3 hrs"), {
        "<1 hr": 0.5, "1–3 hrs": 2, "3–5 hrs": 4, "5+ hrs": 6
    }, 2)

    fruitveg = midpoints(answers.get("fruitVeg", "Few times/week"), {
        # servings per week (rough)
        "Never": 0, "Rarely": 1, "Few times/week": 3, "Daily": 7
    }, 3)

    fam_hist = midpoints(answers.get("familyHistory", "No"), {
        "No": 0, "One parent": 1, "Both parents": 2
    }, 0)

    female = 1.0 if gender == "Female" else 0.0

    # ---- Heuristic clinical estimations ----
    # These are *estimates* purely from lifestyle; fine-tune for your dataset.
    glucose = 90 \
        + 0.8 * sugar_freq \
        + 0.6 * fam_hist \
        - 0.15 * exercise_min \
        + 1.5 * stress_lvl

    bp = 72 \
        + 0.3 * age \
        + 0.4 * stress_lvl \
        + 0.5 * smoking_cigs \
        - 0.6 * diet_score

    skin = 18 \
        + 0.2 * (7 - fruitveg) \
        + 0.15 * sugar_freq

    insulin = 80 \
        + 1.3 * sugar_freq \
        - 0.3 * exercise_min \
        + 0.6 * fam_hist

    # crude BMI estimate
    bmi = 24.5 \
        + 0.25 * (screen_h) \
        - 0.2 * exercise_min/10 \
        - 0.4 * diet_score \
        + 0.1 * stress_lvl

    dpf = 0.45 \
        + 0.12 * fam_hist \
        + 0.02 * max(0, age - 30)/10 \
        + 0.03 * female

    clinical = {
        "Pregnancies": preg if female else 0.0,
        "Glucose": float(glucose),
        "BloodPressure": float(bp),
        "SkinThickness": float(skin),
        "Insulin": float(insulin),
        "BMI": float(bmi),
        "DiabetesPedigreeFunction": float(dpf),
        "Age": float(age),
    }
    # clamp reasonable ranges
    clinical["Glucose"] = max(60, min(250, clinical["Glucose"]))
    clinical["BloodPressure"] = max(50, min(130, clinical["BloodPressure"]))
    clinical["SkinThickness"] = max(5, min(60, clinical["SkinThickness"]))
    clinical["Insulin"] = max(15, min(300, clinical["Insulin"]))
    clinical["BMI"] = max(16, min(48, clinical["BMI"]))
    clinical["DiabetesPedigreeFunction"] = max(0.1, min(2.5, clinical["DiabetesPedigreeFunction"]))

    return clinical
