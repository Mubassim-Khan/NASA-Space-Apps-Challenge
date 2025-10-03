import requests
import pandas as pd
import json
from pathlib import Path
from config import NASA_API, START, END, PARAMS, DATA_DIR

DATA_DIR.mkdir(exist_ok=True)

def fetch_nasa_data(lat, lon):
    """Fetch from NASA POWER API and save as JSON (rows = date, cols = parameters)."""
    params = {
        "start": START,
        "end": END,
        "latitude": lat,
        "longitude": lon,
        "community": "RE",
        "parameters": PARAMS,
        "format": "JSON"
    }
    r = requests.get(NASA_API, params=params)
    r.raise_for_status()
    data = r.json()

    # NASA structure: parameter -> {T2M: {date: val}, PRECTOTCORR: {...}}
    param_dict = data["properties"]["parameter"]

    # Convert to DataFrame (dates as rows)
    df = pd.DataFrame(param_dict)
    df.index.name = "date"
    df.reset_index(inplace=True)

    # Save as JSON instead of CSV
    filepath = DATA_DIR / f"{lat}_{lon}.json"
    df.to_json(filepath, orient="records", indent=2)

    return df, filepath

def load_or_fetch(lat, lon):
    """Load from cache (JSON) if exists, else fetch from NASA."""
    filepath = DATA_DIR / f"{lat}_{lon}.json"
    if filepath.exists():
        df = pd.read_json(filepath)
    else:
        df, filepath = fetch_nasa_data(lat, lon)
    return df, filepath
