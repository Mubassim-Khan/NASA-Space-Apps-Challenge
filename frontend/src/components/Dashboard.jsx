import React, { useState, useEffect } from "react";
import WeatherSearch from "./WeatherSearch";
import MapPicker from "./MapPicker";
import ConditionCards from "./ConditionCards";
import ForecastChart from "./ForecastChart";
import LoadingSkeleton from "./LoadingSkeletion";
import { fetchWeather, geocodeCity, reverseGeocode } from "../lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export default function Dashboard() {
  const [center, setCenter] = useState([24.8607, 67.0011]); // Karachi default
  const [displayName, setDisplayName] = useState("Karachi, Pakistan");
  const [rangeDays, setRangeDays] = useState(3);
  const [probabilities, setProbabilities] = useState({});
  const [summary, setSummary] = useState({});
  console.log(summary);
  const [sampleData, setSampleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFor = async (lat, lon, days = rangeDays, name) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetchWeather(lat, lon, days);
      setProbabilities(res.probabilities || {});
      setSummary(res.summary || {});
      setSampleData(res.sample_data || []);
      setCenter([lat, lon]);
      if (name) setDisplayName(name);
      else {
        const rev = await reverseGeocode(lat, lon).catch(() => null);
        if (rev) setDisplayName(rev);
        else setDisplayName(`${lat.toFixed(3)}, ${lon.toFixed(3)}`);
      }
    } catch (err) {
      setError(err.message || "Failed fetching data");
      setProbabilities({});
      setSummary({});
      setSampleData([]);
    } finally {
      setLoading(false);
    }
  };

  // initial
  useEffect(() => {
    fetchFor(center[0], center[1], rangeDays, displayName);
    // eslint-disable-next-line
  }, []);

  const handleCitySearch = async (city) => {
    setError(null);
    setLoading(true);
    try {
      const loc = await geocodeCity(city);
      await fetchFor(loc.lat, loc.lon, rangeDays, loc.display_name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCoordsSearch = async (lat, lon) => {
    await fetchFor(lat, lon);
  };

  const handleMapChange = async (lat, lon) => {
    await fetchFor(lat, lon);
  };

  const handleDaysChange = (d) => {
    setRangeDays(d);
    fetchFor(center[0], center[1], d);
  };

  const handleDownload = () => {
    const url = `http://127.0.0.1:5000/download?lat=${center[0]}&lon=${center[1]}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              2025 NASA Space Apps Challenge
            </h1>
            <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Will It Rain On My Parade?
            </h3>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl hover:brightness-110"
              >
                <Download className="w-5 h-5" />
                Download Raw Data
              </Button>

              <div className="bg-gray-800 rounded-xl flex items-center gap-2">
                <Select
                  value={rangeDays.toString()}
                  onValueChange={(val) => handleDaysChange(parseInt(val))}
                >
                  <SelectTrigger className="bg-transparent border-0 text-gray-200">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-gray-200 border border-gray-800">
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-4">
        <WeatherSearch
          onCitySearch={handleCitySearch}
          onCoordsSearch={handleCoordsSearch}
        />
        </div>

        <h2 className="text-xl">
          Showing results for:{" "}
          <span className="text-blue-400">{displayName}</span>
        </h2>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {error && (
              <div className="bg-red-900 text-red-100 p-3 rounded">{error}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <MapPicker center={center} onChange={handleMapChange} />
                <ConditionCards probabilities={probabilities} />
              </div>

              <div className="space-y-6">
                <ForecastChart sampleData={sampleData} />
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-700">
                  <h4 className="text-sm text-gray-300 mb-2">Summary</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Avg Temp</div>
                      <div className="text-lg">
                        {summary.avg_temp ?? "—"} °C
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Avg Rain</div>
                      <div className="text-lg">
                        {summary.avg_rainfall ?? "—"} mm
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Avg Wind</div>
                      <div className="text-lg">
                        {summary.avg_windspeed ?? "—"} m/s
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Records</div>
                      <div className="text-lg">{summary.records ?? 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <footer className="text-sm text-gray-500 text-center mt-8">
          Data source: NASA POWER. Probabilities are computed from historical
          records (not a forecast model).
        </footer>
      </div>
    </div>
  );
}
