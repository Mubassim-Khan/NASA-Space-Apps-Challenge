import React from "react";
import { Thermometer, Snowflake, CloudRain, Wind } from "lucide-react";

const ICON_BY_KEY = {
  hot: <Thermometer className="w-6 h-6 text-red-400" />,
  cold: <Snowflake className="w-6 h-6 text-cyan-300" />,
  wet: <CloudRain className="w-6 h-6 text-blue-400" />,
  windy: <Wind className="w-6 h-6 text-indigo-300" />,
};

export default function ConditionCards({ probabilities = {} }) {
  // Ensure deterministic order
  const keys = [
    "hot",
    "cold",
    "wet",
    "windy",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {keys.map((k) => {
        // Ensure safe values (0–100)
        let val = Number(probabilities[k]);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > 100) val = 100;
        return (
          <div
            key={k}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow transition-transform transform hover:scale-105 hover:shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {ICON_BY_KEY[k]}
              <div>
                <div className="text-sm text-gray-300 capitalize">
                  {k.replace("_", " ")}
                </div>
                <div className="text-xl font-semibold text-white">
                  {probabilities[k] ?? 0}%
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {/* optional small note */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
