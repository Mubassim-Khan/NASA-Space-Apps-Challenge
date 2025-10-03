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

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

export default function ForecastChart({ sampleData = [] }) {
  if (!sampleData || sampleData.length === 0) return null;

  const labels = sampleData.map((r) => r.date);
  const temps = sampleData.map((r) => (r.T2M ?? null));
  const prec = sampleData.map((r) => (r.PRECTOTCORR ?? null));

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
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75,192,192,0.08)",
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
      <h4 className="text-sm text-gray-300 mb-3">Historical sample (preview)</h4>
      <div className="h-64">
        <Line key={JSON.stringify(sampleData)} data={data} options={options} redraw />
      </div>
    </div>
  );
}
