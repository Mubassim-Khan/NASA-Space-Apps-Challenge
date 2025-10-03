from flask import Flask, request, jsonify, send_file
from nasa_service import load_or_fetch
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

_MISSING_SENTINELS = {-99, -999, -9999, -99999, -999.0, -9999.0, -99999.0}

def _sanitize_series(df: pd.DataFrame, col: str,
                     min_valid: float = None, max_valid: float = None) -> pd.Series:
    """
    Clean and filter a numeric series.
    """
    if col not in df.columns:
        return pd.Series(dtype="float64")  # empty

    # Convert to numeric and coerce errors -> NaN
    s = pd.to_numeric(df[col], errors="coerce")

    # Replace sentinel values with NaN
    s = s.replace(list(_MISSING_SENTINELS), float("nan"))

    # Apply min/max filtering
    if min_valid is not None:
        s = s.where(s >= min_valid)
    if max_valid is not None:
        s = s.where(s <= max_valid)

    return s.dropna().astype(float)

def compute_probabilities(df, days=7):
    """Compute weather probabilities for selected range with sanitization."""
    df_recent = df.tail(days)

    # sanitize series with realistic ranges
    t2m      = _sanitize_series(df_recent, "T2M", min_valid=-90, max_valid=60)
    t2m_min  = _sanitize_series(df_recent, "T2M_MIN", min_valid=-90, max_valid=60)
    t2m_max  = _sanitize_series(df_recent, "T2M_MAX", min_valid=-90, max_valid=70)
    rain     = _sanitize_series(df_recent, "PRECTOTCORR", min_valid=0, max_valid=1000)  # mm/day
    ws       = _sanitize_series(df_recent, "WS2M", min_valid=0, max_valid=200)         # m/s
    rh       = _sanitize_series(df_recent, "RH2M", min_valid=0, max_valid=100)         # %
    solar    = _sanitize_series(df_recent, "ALLSKY_SFC_SW_DWN", min_valid=0, max_valid=2000)

    # helper: safe % over threshold
    def pct_over(series, threshold):
        return 0.0 if len(series) == 0 else round((series > threshold).mean() * 100, 2)

    probabilities = {
        "very_hot": pct_over(t2m_max, 35),
        "very_cold": pct_over(t2m_min, 5),
        "very_wet": pct_over(rain, 5),
        "very_windy": pct_over(ws, 10),
        "very_uncomfortable": pct_over(rh, 80),
    }

    def mean_or_none(series):
        return None if len(series) == 0 else round(series.mean(), 2)

    summary = {
        "avg_temp": mean_or_none(t2m),
        "min_temp": None if len(t2m_min) == 0 else round(t2m_min.min(), 2),
        "max_temp": None if len(t2m_max) == 0 else round(t2m_max.max(), 2),
        "avg_rainfall": mean_or_none(rain),
        "avg_windspeed": mean_or_none(ws),
        "avg_humidity": mean_or_none(rh),
        "avg_solar_radiation": mean_or_none(solar),
        "records": len(df_recent)
    }

    return probabilities, summary

@app.route("/weather", methods=["GET"])
def get_weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    days = int(request.args.get("days", 7))  # default 7 days
    download = request.args.get("download", "false").lower() == "true"

    if not lat or not lon:
        return jsonify({"error": "lat and lon required"}), 400

    try:
        lat, lon = float(lat), float(lon)
    except ValueError:
        return jsonify({"error": "Invalid coordinates"}), 400

    df, filepath = load_or_fetch(lat, lon)

    # Ensure "date" is datetime
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # Compute probabilities + summary
    probabilities, summary = compute_probabilities(df, days)

    if download:
        return send_file(filepath, as_attachment=True)

    return jsonify({
        "location": {"lat": lat, "lon": lon},
        "range_days": days,
        "probabilities": probabilities,
        "summary": summary,
        "sample_data": df.tail(10).to_dict(orient="records"),
        "available_columns": list(df.columns)
    })

@app.route("/download", methods=["GET"])
def download_data():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        return jsonify({"error": "lat and lon required"}), 400

    df, filepath = load_or_fetch(lat, lon)
    return send_file(filepath, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
