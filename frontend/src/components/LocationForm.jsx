import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MapPin } from "lucide-react";

export default function LocationForm({ onSearch }) {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lat && lon) onSearch(lat, lon);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-center bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700"
    >
      <div className="flex items-center gap-2 w-full">
        <MapPin className="text-blue-400" />
        <Input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="bg-gray-800 text-gray-200"
        />
      </div>
      <div className="flex items-center gap-2 w-full">
        <MapPin className="text-green-400" />
        <Input
          type="text"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="bg-gray-800 text-gray-200"
        />
      </div>
      <Button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
      >
        Search
      </Button>
    </form>
  );
}
