import React, { useState } from "react";
import { Loader, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

export default function WeatherSearch({
  onCitySearch,
  onCoordsSearch,
  loading,
}) {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const submitCity = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error("Please enter a city name first!");
      return;
    }

    try {
      await onCitySearch(city);
    } catch (err) {
      toast.error("City not found. Please check the name and try again!");
    }
  };

  const submitCoords = (e) => {
    e.preventDefault();
    if (!lat || !lon) return;
    onCoordsSearch(parseFloat(lat), parseFloat(lon));
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      <form onSubmit={submitCity} className="flex gap-3 items-center">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Type a city name (e.g., Karachi, Pakistan)"
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none"
        />
        <Button
          type="submit"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform"
          aria-label="Search City"
        >
          {loading ? (
            <Loader className="animate-spin h-5 w-5 text-white" />
          ) : (
            <Search className="w-5 h-5 text-white" />
          )}
        </Button>
      </form>

      <form onSubmit={submitCoords} className="flex gap-3 items-center">
        <Input
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="w-1/3 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-100"
        />
        <Input
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="w-1/3 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-100"
        />
        <Button
          type="submit"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition"
        >
          {loading ? (
            <Loader className="animate-spin h-5 w-5 text-white" />
          ) : (
            <Search className="w-5 h-5 text-white" />
          )}
          Use coordinates
        </Button>
      </form>
    </div>
  );
}
