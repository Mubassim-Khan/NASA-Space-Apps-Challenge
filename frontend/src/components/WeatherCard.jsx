import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Thermometer, CloudRain, Sun, Database } from "lucide-react";

export default function WeatherCard({ data }) {
  const { avg_temp, total_rainfall, avg_solar_radiation, records } =
    data.summary;

  return (
    <Card className="bg-gray-900 border border-gray-700 text-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
      <CardHeader className="text-xl font-bold text-center text-blue-400">
        Weather Summary
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 p-6">
        <div className="flex flex-col items-center">
          <Thermometer className="w-8 h-8 text-red-400 mb-2" />
          <p className="text-lg">{avg_temp} °C</p>
          <p className="text-sm text-gray-400">Avg Temp</p>
        </div>
        <div className="flex flex-col items-center">
          <CloudRain className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-lg">{total_rainfall} mm</p>
          <p className="text-sm text-gray-400">Total Rainfall</p>
        </div>
        <div className="flex flex-col items-center">
          <Sun className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-lg">{avg_solar_radiation}</p>
          <p className="text-sm text-gray-400">Solar Radiation</p>
        </div>
        <div className="flex flex-col items-center">
          <Database className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-lg">{records}</p>
          <p className="text-sm text-gray-400">Days Analyzed</p>
        </div>
      </CardContent>
    </Card>
  );
}
