const BASE = "http://127.0.0.1:5000";

export async function fetchWeather(lat, lon, days = 3, download = false) {
  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&days=${days}&download=${download}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function geocodeCity(city) {
  // Nominatim (OpenStreetMap) geocoding
  const q = encodeURIComponent(city);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "NASA-SpaceApps-Frontend/1.0 (email@example.com)",
    },
  });
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data || data.length === 0) throw new Error("Location not found");
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    display_name: data[0].display_name,
  };
}

export async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url, {
    headers: { "User-Agent": "NASA-SpaceApps-Frontend/1.0 (you@example.com)" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.display_name || null;
}