from flask import Flask, request, jsonify, send_file
from nasa_service import load_or_fetch
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

def compute_probabilities(df, days=7):
    """Compute weather probabilities for selected range."""
    # Take only last `days` worth of records
    df_recent = df.tail(days)

    results = {
        "very_hot": round((df_recent["T2M_MAX"] > 35).mean() * 100, 2),
        "very_cold": round((df_recent["T2M_MIN"] < 5).mean() * 100, 2),
        "very_wet": round((df_recent["PRECTOTCORR"] > 5).mean() * 100, 2),
        "very_windy": round((df_recent["WS2M"] > 10).mean() * 100, 2),
        "very_uncomfortable": round((df_recent["RH2M"] > 80).mean() * 100, 2),
    }

    summary = {
        "avg_temp": round(df_recent["T2M"].mean(), 2),
        "min_temp": round(df_recent["T2M_MIN"].min(), 2),
        "max_temp": round(df_recent["T2M_MAX"].max(), 2),
        "avg_rainfall": round(df_recent["PRECTOTCORR"].mean(), 2),
        "avg_windspeed": round(df_recent["WS2M"].mean(), 2),
        "avg_humidity": round(df_recent["RH2M"].mean(), 2),
        "avg_solar_radiation": round(df_recent["ALLSKY_SFC_SW_DWN"].mean(), 2),
        "records": len(df_recent)
    }

    return results, summary

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
