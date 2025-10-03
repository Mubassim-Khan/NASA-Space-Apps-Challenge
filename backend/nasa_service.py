import requests
import pandas as pd
from pathlib import Path
from config import NASA_API, START, END, PARAMS, DATA_DIR

DATA_DIR.mkdir(exist_ok=True)

def fetch_nasa_data(lat, lon, days):
    """Fetch from NASA POWER API and save as CSV."""
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

    df = pd.DataFrame(data["properties"]["parameter"])
    
    # Dates are in index; make them a column
    df = df.reset_index().rename(columns={"index": "date"})

    # Convert to datetime
    df["date"] = pd.to_datetime(df["date"].astype(str), format="%Y%m%d")

    
    filepath = DATA_DIR / f"{lat}_{lon}.csv"
    df.to_csv(filepath, index=False)
    return df, filepath

def load_or_fetch(lat, lon, days):
    """Load from cache if exists, else fetch from NASA."""
    filepath = DATA_DIR / f"{lat}_{lon}.csv"
    if filepath.exists():
        df = pd.read_csv(filepath)
    else:
        df, filepath = fetch_nasa_data(lat, lon, days)
    return df, filepath
