import requests
from datetime import datetime

import requests
from datetime import datetime

# Weather code mapping (based on Open-Meteo documentation)
WEATHER_CODE_MAP = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}

def map_weather_code(code):
    """Convert numeric weather code into human-readable condition."""
    return WEATHER_CODE_MAP.get(code, "Unknown")

def fetch_forecast(lat, lon, days):
    """
    Fetch weather forecast for the given coordinates and number of days
    using the Open-Meteo API.
    """

def fetch_forecast(lat, lon, days):
    """
    Fetch weather forecast for the given coordinates and number of days
    using the Open-Meteo API.
    """
    url = "https://api.open-meteo.com/v1/forecast"
    
    params = {
        "latitude": lat,
        "longitude": lon,
        "forecast_days": days,
        "daily": [
            "temperature_2m_max",
            "temperature_2m_min",
            "apparent_temperature_max",
            "apparent_temperature_min",
            "precipitation_sum",
            "precipitation_probability_mean",
            "weathercode",
            "windspeed_10m_max",
            "relative_humidity_2m_max",
            "relative_humidity_2m_min"
        ],
        "timezone": "auto",
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    # If API didn’t return expected data
    if "daily" not in data:
        return {"error": "Forecast data not available for the given location."}, None

    daily_data = data["daily"]
    forecasts = []
    for i in range(len(daily_data["time"])):
        forecasts.append({
            "date": daily_data["time"][i],
            "max_temp": daily_data["temperature_2m_max"][i],
            "min_temp": daily_data["temperature_2m_min"][i],
            "expected_temp": round((daily_data["temperature_2m_max"][i] + daily_data["temperature_2m_min"][i]) / 2, 1),
            "humidity": round((daily_data["relative_humidity_2m_max"][i] + daily_data["relative_humidity_2m_min"][i]) / 2, 1),
            "rain_chance": daily_data.get("precipitation_probability_mean", [None])[i],
            "rainfall": daily_data["precipitation_sum"][i],
            "windspeed": daily_data["windspeed_10m_max"][i],
            "weather_code": daily_data["weathercode"][i],
        })

    return forecasts, None
