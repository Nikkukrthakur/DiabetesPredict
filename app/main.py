from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
from pathlib import Path
from typing import Dict, Any

from .mapping import map_quiz_to_clinical, CLINICAL_KEYS

app = FastAPI(title="Diabetes Risk API")

# Allow local dev from Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_DIR = Path(__file__).parent / "models"
MODEL_PATH = MODEL_DIR / "diabetes_model.pkl"
SCALER_PATH = MODEL_DIR / "scaler.pkl"

model = None
scaler = None

def _load_artifacts():
    global model, scaler
    if not MODEL_PATH.exists():
        raise RuntimeError(f"Model not found at {MODEL_PATH}")
    if not SCALER_PATH.exists():
        raise RuntimeError(f"Scaler not found at {SCALER_PATH}")

    with open(MODEL_PATH, "rb") as f:
        model_obj = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler_obj = pickle.load(f)
    return model_obj, scaler_obj

try:
    model, scaler = _load_artifacts()
except Exception as e:
    # Surface load errors on startup
    print("Artifact load error:", e)

class QuizAnswers(BaseModel):
    # Must match your quiz IDs (all strings from the UI)
    smoking: str
    alcohol: str
    exercise: str
    diet: str
    water: str
    sleep: str
    meals: str
    sugarIntake: str
    stress: str
    screenTime: str
    fruitVeg: str
    familyHistory: str
    gender: str
    pregnancies: str
    age: str

class PredictionOut(BaseModel):
    prediction: str                # "Diabetic" / "Non-Diabetic" / "High" / "Low"
    probability: float             # 0..1
    message: str
    clinicalData: Dict[str, float] # values we estimated/passed to the chart

@app.post("/predict", response_model=PredictionOut)
def predict(answers: QuizAnswers):
    """
    Accepts your quiz answers, maps them to clinical-like features,
    scales them, runs the pickle model, and returns a friendly payload
    your results page already understands.
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model artifacts not loaded on server.")

    # 1) Map lifestyle -> clinical estimates (tweak mapping.py as you like)
    clinical = map_quiz_to_clinical(answers.dict())

    # 2) Order features for the trained model
    X = np.array([[clinical[k] for k in CLINICAL_KEYS]], dtype=float)

    # 3) Scale + predict
    try:
        Xs = scaler.transform(X)
    except Exception:
        # If your scaler isn't compatible, try without scaling:
        Xs = X

    # Compatible with sklearn classifiers exposing predict_proba / decision_function
    proba = None
    try:
        proba = float(model.predict_proba(Xs)[0, 1])
    except Exception:
        try:
            decision = float(model.decision_function(Xs)[0])
            # squish to (0,1)
            proba = float(1/(1+np.exp(-decision)))
        except Exception:
            # last resort
            proba = float(model.predict(Xs)[0])
            # normalize rough prob
            if proba > 1:
                proba = 1.0
            elif proba < 0:
                proba = 0.0

    y_pred = int(model.predict(Xs)[0])
    label = "Diabetic" if y_pred == 1 else "Non-Diabetic"

    message = (
        "Your lifestyle inputs suggest higher-than-recommended clinical estimates. "
        "Please consult a clinician for confirmatory tests."
        if label == "Diabetic" else
        "Your lifestyle inputs suggest near-recommended clinical estimates. Keep up healthy habits!"
    )

    return PredictionOut(
        prediction=label,
        probability=round(proba, 3),
        message=message,
        clinicalData=clinical
    )
