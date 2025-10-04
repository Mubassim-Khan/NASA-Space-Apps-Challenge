import React from "react";
import { Thermometer, CloudRain, Wind, Sun } from "lucide-react";

export default function SuggestionCards({ summary = {} }) {
  const suggestions = [];

  const forecast = summary.forecast || [];

  // Avoid errors if no data
  if (forecast.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          Suggestions for Your Trip
        </h3>
        <p className="text-gray-300">No forecast data available yet.</p>
      </div>
    );
  }

  // Calculate averages
  const avg_temp =
    forecast.reduce((sum, f) => sum + (f.expected_temp || 0), 0) /
    forecast.length;
  const avg_rainfall =
    forecast.reduce((sum, f) => sum + (f.rainfall || 0), 0) / forecast.length;
  const avg_windspeed =
    forecast.reduce((sum, f) => sum + (f.windspeed || 0), 0) / forecast.length;

  const max_temp = Math.max(...forecast.map((f) => f.max_temp || 0));
  const min_temp = Math.min(...forecast.map((f) => f.min_temp || 0));

  // 🧊 Temperature-based suggestions
  if (avg_temp >= 30)
    suggestions.push({
      text: "Temperatures are generally high. Light clothing is recommended!",
      icon: <Sun className="w-6 h-6 text-yellow-400" />,
    });
  else if (avg_temp <= 15)
    suggestions.push({
      text: "Cool conditions expected. Keep warm and dress in layers!",
      icon: <Thermometer className="w-6 h-6 text-red-400" />,
    });

  // 🌧 Rainfall suggestions
  if (avg_rainfall > 2)
    suggestions.push({
      text: "Frequent or heavy rainfall predicted. Carry rain protection!",
      icon: <CloudRain className="w-6 h-6 text-blue-400" />,
    });
  else if (avg_rainfall < 0.5)
    suggestions.push({
      text: "Low rainfall expected. Enjoy mostly dry conditions.",
      icon: <CloudRain className="w-6 h-6 text-gray-400" />,
    });

  // 🌬 Wind suggestions
  if (avg_windspeed > 10)
    suggestions.push({
      text: "Windy conditions expected. A windbreaker could be useful!",
      icon: <Wind className="w-6 h-6 text-indigo-300" />,
    });
  else if (avg_windspeed < 4)
    suggestions.push({
      text: "Winds are generally calm across this period.",
      icon: <Wind className="w-6 h-6 text-gray-300" />,
    });

  // 🔥 Extremes
  if (max_temp > 35)
    suggestions.push({
      text: "Some days might be extremely hot. Stay hydrated and avoid direct sunlight!",
      icon: <Sun className="w-6 h-6 text-orange-400" />,
    });
  if (min_temp < 10)
    suggestions.push({
      text: "Expect some cold spells. Pack warm clothing just in case!",
      icon: <Thermometer className="w-6 h-6 text-cyan-400" />,
    });

  // 🟢 Default fallback
  if (suggestions.length === 0) {
    suggestions.push({
      text: "Weather looks moderate overall — perfect for outdoor plans!",
      icon: <Sun className="w-6 h-6 text-green-400" />,
    });
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-100">
        Suggestions for Your Trip
      </h3>
      <div className="flex flex-col gap-3">
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg"
          >
            {s.icon}
            <span className="text-white font-medium">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
