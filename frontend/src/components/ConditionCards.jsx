import React from "react";
import { Thermometer, Snowflake, CloudRain, Wind, Droplet } from "lucide-react";

const ICON_BY_KEY = {
  very_hot: <Thermometer className="w-6 h-6 text-red-400" />,
  very_cold: <Snowflake className="w-6 h-6 text-cyan-300" />,
  very_wet: <CloudRain className="w-6 h-6 text-blue-400" />,
  very_windy: <Wind className="w-6 h-6 text-indigo-300" />,
  very_uncomfortable: <Droplet className="w-6 h-6 text-yellow-300" />,
};

export default function ConditionCards({ probabilities = {} }) {
  // Ensure deterministic order
  const keys = ["very_hot", "very_cold", "very_wet", "very_windy", "very_uncomfortable"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {keys.map((k) => (
        <div
          key={k}
          className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow card-hover flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {ICON_BY_KEY[k]}
            <div>
              <div className="text-sm text-gray-300 capitalize">{k.replace("_", " ")}</div>
              <div className="text-xl font-semibold text-white">{probabilities[k] ?? 0}%</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">{/* optional small note */}</div>
        </div>
      ))}
    </div>
  );
}
