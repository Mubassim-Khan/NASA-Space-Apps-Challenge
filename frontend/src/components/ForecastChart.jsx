import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Info } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "./ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ForecastChart({ sampleData = [], days }) {
  if (!sampleData || sampleData.length === 0) return null;

  // filter out invalid or missing data
  const SENTINELS = [-99, -999, -9999, -99999];

  const cleaned = sampleData
    .map((r) => ({
      ...r,
      T2M: SENTINELS.includes(r.T2M) ? null : r.T2M,
      PRECTOTCORR: SENTINELS.includes(r.PRECTOTCORR) ? 0 : r.PRECTOTCORR,
      RH2M: SENTINELS.includes(r.RH2M) ? null : r.RH2M,
      WS2M: SENTINELS.includes(r.WS2M) ? null : r.WS2M,
    }))
    .filter((r) => r.date && !isNaN(new Date(r.date)));

  // only take the number of days requested
  const sliced = cleaned.slice(-days);

  const labels = sliced.map((r) => {
    const d = new Date(r.date.includes("T") ? r.date : r.date + "T00:00:00Z");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  const temps = sliced.map((r) => r.T2M);
  const prec = sliced.map((r) => (r.PRECTOTCORR >= 0 ? r.PRECTOTCORR : 0));

  console.log(sampleData)

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255,99,132,0.12)",
        tension: 0.3,
        yAxisID: "y",
      },
      {
        label: "Precipitation (mm)",
        data: prec,
        backgroundColor: "rgba(30, 144, 255, 0.5)",
        borderColor: "#1E90FF",
        type: "bar",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#E5E7EB" } },
      tooltip: { bodyColor: "#E5E7EB" },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#E5E7EB" },
        grid: { color: "rgba(255,255,255,0.03)" },
      },
      y: {
        position: "left",
        ticks: { color: "#E5E7EB" },
        grid: { color: "rgba(255,255,255,0.03)" },
      },
      y1: {
        position: "right",
        ticks: { color: "#E5E7EB" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm text-gray-300">Graphical Data</h4>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="p-1 rounded-full bg-gray-800 hover:bg-gray-900">
              <Info className="w-5 h-5 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-md shadow-lg z-[9999]">
            As per 1st Oct 2025, NASA has stopped providing the data.
          </PopoverContent>
        </Popover>
      </div>

      <div className="h-64">
        <Line
          key={JSON.stringify(sliced)}
          data={data}
          options={options}
          redraw
        />
      </div>
    </div>
  );
}
