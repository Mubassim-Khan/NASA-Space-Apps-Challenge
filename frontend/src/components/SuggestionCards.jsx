import React from "react";
import { Thermometer, CloudRain, Wind, Sun } from "lucide-react";

export default function SuggestionCards({ summary = {} }) {
  const suggestions = [];

  const { avg_temp, max_temp, min_temp, avg_rainfall, avg_windspeed } = summary;

  // Temperature suggestions
  if (avg_temp !== undefined) {
    if (avg_temp >= 30)
      suggestions.push({
        text: "It's hot. Wear light clothing!",
        icon: <Sun className="w-6 h-6 text-yellow-400" />,
      });
    if (avg_temp <= 15)
      suggestions.push({
        text: "It's cold. Take a jacket!",
        icon: <Thermometer className="w-6 h-6 text-red-400" />,
      });
  }

  // Rainfall suggestions
  if (avg_rainfall !== undefined) {
    if (avg_rainfall > 2)
      suggestions.push({
        text: "High chance of rain. Don't forget an umbrella!",
        icon: <CloudRain className="w-6 h-6 text-blue-400" />,
      });
  }

  // Wind suggestions
  if (avg_windspeed !== undefined) {
    if (avg_windspeed > 10)
      suggestions.push({
        text: "It might be windy. Consider a windbreaker!",
        icon: <Wind className="w-6 h-6 text-indigo-300" />,
      });
  }

  // Max/min temperature alerts
  if (max_temp !== undefined && max_temp > 35) {
    suggestions.push({
      text: "Very hot during the day. Stay hydrated!",
      icon: <Sun className="w-6 h-6 text-orange-400" />,
    });
  }
  if (min_temp !== undefined && min_temp < 10) {
    suggestions.push({
      text: "Cold nights expected. Pack warm clothes!",
      icon: <Thermometer className="w-6 h-6 text-cyan-400" />,
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      text: "Weather looks moderate. Enjoy your day!",
      icon: <Sun className="w-6 h-6 text-green-400" />,
    });
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">
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
