export async function fetchWeather(lat, lon, download = false) {
  const url = `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}&download=${download}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return await res.json();
}
