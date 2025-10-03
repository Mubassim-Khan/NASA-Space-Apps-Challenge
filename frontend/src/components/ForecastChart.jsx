import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ForecastChart({ sampleData = [], days = 7 }) {
  if (!sampleData || sampleData.length === 0) return null;

  // filter out invalid or missing data
  const cleaned = sampleData.filter(
    (r) =>
      r.date &&
      !isNaN(new Date(r.date)) &&
      r.T2M != null &&
      r.T2M > -90 &&
      r.T2M < 60
  );

  // only take the number of days requested
  const sliced = cleaned.slice(0, days);

  const labels = sliced.map((r) => {
    const d = new Date(r.date.includes("T") ? r.date : r.date + "T00:00:00Z");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  const temps = sliced.map((r) => r.T2M);
  const prec = sliced.map((r) => (r.PRECTOTCORR >= 0 ? r.PRECTOTCORR : 0));

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
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow">
      <h4 className="text-sm text-gray-300 mb-3">
        Historical sample (preview)
      </h4>
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
