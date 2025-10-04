import React from "react";
import { Thermometer, CloudRain, Wind, Sun } from "lucide-react";

export default function SuggestionCards({ summary = {} }) {
  const suggestions = [];

  const { avg_temp, max_temp, min_temp, avg_rainfall, avg_windspeed } = summary;

  if (avg_temp !== undefined) {
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
  }

  // Rainfall suggestions
  if (avg_rainfall !== undefined) {
    if (avg_rainfall > 2)
      suggestions.push({
        text: "Frequent or heavy rainfall observed. Carry rain protection!",
        icon: <CloudRain className="w-6 h-6 text-blue-400" />,
      });
    else if (avg_rainfall < 0.5)
      suggestions.push({
        text: "Low rainfall overall. Expect mostly dry conditions.",
        icon: <CloudRain className="w-6 h-6 text-gray-400" />,
      });
  }

  // Wind suggestions
  if (avg_windspeed !== undefined) {
    if (avg_windspeed > 10)
      suggestions.push({
        text: "Windy conditions are common. A windbreaker could be useful!",
        icon: <Wind className="w-6 h-6 text-indigo-300" />,
      });
    else if (avg_windspeed < 4)
      suggestions.push({
        text: "Winds are generally calm across this period.",
        icon: <Wind className="w-6 h-6 text-gray-300" />,
      });
  }

  // Max/min temperature alerts (generalized)
  if (max_temp !== undefined && max_temp > 35) {
    suggestions.push({
      text: "Occasionally very hot weather occurs. Stay cool and hydrated!",
      icon: <Sun className="w-6 h-6 text-orange-400" />,
    });
  }
  if (min_temp !== undefined && min_temp < 10) {
    suggestions.push({
      text: "Some periods can be quite cold. Keep warm clothing handy!",
      icon: <Thermometer className="w-6 h-6 text-cyan-400" />,
    });
  }

  // Default suggestion
  if (suggestions.length === 0) {
    suggestions.push({
      text: "Weather conditions appear moderate overall. Great time to plan outdoor activities!",
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
