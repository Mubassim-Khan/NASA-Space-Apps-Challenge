"use client";
import { useState } from "react";
import LocationForm from "./LocationForm";
import WeatherCard from "./WeatherCard";
import { fetchWeather } from "../lib/api";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (lat, lon) => {
    setLoading(true);
    try {
      const data = await fetchWeather(lat, lon);
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center gap-8 p-10">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        NASA Weather Insights
      </h1>
      <LocationForm onSearch={handleSearch} />
      {loading && <Loader2 className="animate-spin text-blue-400 w-10 h-10" />}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
