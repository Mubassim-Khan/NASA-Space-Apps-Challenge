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

def compute_probabilities(df, days, monthly_percentiles=None):
    """
    Compute weather probabilities using historical percentiles.
    monthly_percentiles: dict with structure
      {month: {'hot': 90th percentile, 'cold': 10th percentile}}
      If None, it will compute from df itself.
    """
    df = df.sort_values("date")
    df_recent = df.tail(days)

    t2m_min  = _sanitize_series(df_recent, "T2M_MIN", -90, 60)
    t2m_max  = _sanitize_series(df_recent, "T2M_MAX", -90, 70)
    t2m_mean = (t2m_min + t2m_max) / 2

    rain     = _sanitize_series(df_recent, "PRECTOTCORR", 0, 1000)
    ws       = _sanitize_series(df_recent, "WS2M", 0, 200)
    rh       = _sanitize_series(df_recent, "RH2M", 0, 100)

    # Determine month of recent data
    month = df_recent['date'].dt.month.iloc[-1]

    # Compute percentiles if not provided
    if monthly_percentiles is None:
        monthly_percentiles = {}
        for m in range(1, 13):
            df_month = df[df['date'].dt.month == m]
            if len(df_month) == 0:
                continue
            t2m_min_month = _sanitize_series(df_month, "T2M_MIN", -90, 60)
            t2m_max_month = _sanitize_series(df_month, "T2M_MAX", -90, 70)
            t2m_mean_month = (t2m_min_month + t2m_max_month) / 2
            if len(t2m_mean_month) == 0:
                continue
            monthly_percentiles[m] = {
                'hot': t2m_mean_month.quantile(0.9),   # top 10% hottest
                'cold': t2m_mean_month.quantile(0.1)   # bottom 10% coldest
            }

    hot_threshold = monthly_percentiles.get(month, {}).get('hot', 35)
    cold_threshold = monthly_percentiles.get(month, {}).get('cold', 5)

    def pct_over(series, threshold):
        return 0.0 if len(series) == 0 else round((series > threshold).mean() * 100, 2)

    probabilities = {
        "hot": pct_over(t2m_mean, hot_threshold),
        "cold": pct_over(t2m_mean, cold_threshold),
        "wet": pct_over(rain, 5),
        "windy": pct_over(ws, 10),
        "uncomfortable": pct_over(rh, 80),
    }

    summary = {
        "avg_temp": round(t2m_mean.mean(), 2) if len(t2m_mean) else None,
        "min_temp": t2m_min.min() if len(t2m_min) else None,
        "max_temp": t2m_max.max() if len(t2m_max) else None,
        "avg_rainfall": round(rain.mean(), 2) if len(rain) else None,
        "avg_windspeed": round(ws.mean(), 2) if len(ws) else None,
        "avg_humidity": round(rh.mean(), 2) if len(rh) else None,
        "records": len(df_recent)
    }

    return probabilities, summary

@app.route("/weather", methods=["GET"])
def get_weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    days = int(request.args.get("days"))
    download = request.args.get("download", "false").lower() == "true"

    if not lat or not lon:
        return jsonify({"error": "lat and lon required"}), 400

    try:
        lat, lon = float(lat), float(lon)
    except ValueError:
        return jsonify({"error": "Invalid coordinates"}), 400

    df, filepath = load_or_fetch(lat, lon, days)

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
        "sample_data": df.tail(days).to_dict(orient="records"),
        "available_columns": list(df.columns)
    })

@app.route("/download", methods=["GET"])
def download_data():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    days = request.args.get("days")

    if not lat or not lon:
        return jsonify({"error": "lat and lon required"}), 400

    df, filepath = load_or_fetch(lat, lon, days)
    return send_file(filepath, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
