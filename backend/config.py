from pathlib import Path

# NASA API details
NASA_API = "https://power.larc.nasa.gov/api/temporal/daily/point"
START = "20000101"
END = "20251001"
PARAMS = "T2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN"

# Storage
DATA_DIR = Path("weather_data")
