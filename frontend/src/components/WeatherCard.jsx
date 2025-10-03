import React from "react";
import { Thermometer, CloudRain, Wind, Sun } from "lucide-react";

export default function WeatherCard({ summary, probabilities, range_days }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow card-hover">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">Summary ({range_days} days)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Thermometer className="w-7 h-7 text-red-400" />
            <div>
              <div className="text-lg font-medium">{summary.avg_temp ?? "—"} °C</div>
              <div className="text-sm text-gray-400">Avg Temperature</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CloudRain className="w-7 h-7 text-blue-400" />
            <div>
              <div className="text-lg font-medium">{summary.avg_rainfall ?? "—"} mm</div>
              <div className="text-sm text-gray-400">Avg Rain</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="w-7 h-7 text-indigo-400" />
            <div>
              <div className="text-lg font-medium">{summary.avg_windspeed ?? "—"} m/s</div>
              <div className="text-sm text-gray-400">Avg Wind</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="w-7 h-7 text-yellow-400" />
            <div>
              <div className="text-lg font-medium">{summary.avg_solar_radiation ?? "—"}</div>
              <div className="text-sm text-gray-400">Solar Rad</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow card-hover">
        <h3 className="text-xl font-semibold text-purple-300 mb-3">Probability of Conditions</h3>
        <div className="space-y-3">
          {Object.entries(probabilities).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <div className="capitalize text-sm text-gray-300">{k.replace("_", " ")}</div>
              <div className="font-semibold text-lg text-white">{v}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
