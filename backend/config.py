from pathlib import Path

# NASA POWER API details
NASA_API = "https://power.larc.nasa.gov/api/temporal/daily/point"
START = "20000101"
END = "20251001"

# Include all useful parameters
PARAMS = ",".join([
    "T2M", "T2M_MAX", "T2M_MIN",        # Temperature
    "PRECTOTCORR",                      # Precipitation
    "WS2M",                             # Wind speed
    "RH2M",                             # Relative humidity
    "ALLSKY_SFC_SW_DWN",                # Solar radiation
    "ALLSKY_KT",                        # Cloud cover (transmittance)
])

# Data storage
DATA_DIR = Path("weather_data")
