from pathlib import Path
from datetime import datetime, timedelta

# NASA POWER API details
NASA_API = "https://power.larc.nasa.gov/api/temporal/daily/point"
days_back = 30  

# Compute dynamic end and start dates
END = datetime.today().strftime("%Y%m%d")
START = (datetime.today() - timedelta(days=days_back - 1)).strftime("%Y%m%d")

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
