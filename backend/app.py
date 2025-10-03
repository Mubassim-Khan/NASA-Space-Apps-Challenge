from flask import Flask, request, jsonify, send_file
from nasa_service import load_or_fetch
import os

app = Flask(__name__)

@app.route("/weather", methods=["GET"])
def get_weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    download = request.args.get("download", "false").lower() == "true"

    if not lat or not lon:
        return jsonify({"error": "lat and lon required"}), 400

    try:
        lat, lon = float(lat), float(lon)
    except ValueError:
        return jsonify({"error": "Invalid coordinates"}), 400

    df, filepath = load_or_fetch(lat, lon)

    summary = {
        "avg_temp": round(df["T2M"].mean(), 2),
        "total_rainfall": round(df["PRECTOTCORR"].sum(), 2),
        "avg_solar_radiation": round(df["ALLSKY_SFC_SW_DWN"].mean(), 2),
        "records": len(df)
    }

    if download:
        return send_file(filepath, as_attachment=True)

    return jsonify({
        "location": {"lat": lat, "lon": lon},
        "summary": summary,
        "sample_data": df.head(10).to_dict(orient="records")
    })

if __name__ == "__main__":
    app.run(debug=False)
