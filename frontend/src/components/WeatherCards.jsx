import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Sun, CloudRain, Cloud, CloudSnow, Wind, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as ShadCalendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { format } from "date-fns";

export default function WeatherForecastCards({ forecastData = [] }) {
  const [displayMode, setDisplayMode] = useState("16");
  const [customDate, setCustomDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getIcon = (code) => {
    if (code === 0) return <Sun className="w-8 h-8 text-yellow-400" />;
    if ([1, 2, 3].includes(code))
      return <Cloud className="w-8 h-8 text-gray-300" />;
    if ([45, 48].includes(code))
      return <Cloud className="w-8 h-8 text-gray-400" />;
    if ([51, 61, 63, 65, 80, 81, 82].includes(code))
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    if ([71, 73, 75, 77].includes(code))
      return <CloudSnow className="w-8 h-8 text-cyan-400" />;
    if ([95, 96, 99].includes(code))
      return <Wind className="w-8 h-8 text-indigo-300" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  const handleSelectChange = (val) => {
    setDisplayMode(val);
    setCustomDate(null);
  };

  const handleDateSearch = () => {
    if (!customDate) {
      toast.error("Please select a date first!");
      return;
    }

    const formattedDate = format(customDate, "yyyy-MM-dd");
    const match = forecastData.find((f) => f.date === formattedDate);

    if (!match) {
      toast.error("Selected date is out of range (only 16 days ahead available)!");
      return;
    }

    setDisplayMode("custom");
  };

  let displayedData = forecastData.slice(0, parseInt(displayMode));
  if (displayMode === "custom" && customDate) {
    const formattedDate = format(customDate, "yyyy-MM-dd");
    displayedData = forecastData.filter((f) => f.date === formattedDate);
  }

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 w-full overflow-hidden">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-100">
          Weather Forecast
        </h2>

        <div className="flex items-center gap-3 flex-wrap">
          <Select value={displayMode} onValueChange={handleSelectChange}>
            <SelectTrigger className="bg-gray-900 border-0 text-gray-200">
              <SelectValue placeholder="Display range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-200 border border-gray-600 z-100">
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="5">5 days</SelectItem>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="10">10 days</SelectItem>
              <SelectItem value="16">16 days</SelectItem>
              <SelectItem value="custom">Pick a Date</SelectItem>
            </SelectContent>
          </Select>

          {displayMode === "custom" && (
            <div className="flex items-center gap-2">
              {/* ShadCN Calendar Popover */}
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-800 text-gray-200 hover:bg-gray-900 hover:text-white border border-gray-600 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {customDate ? format(customDate, "MMM d, yyyy") : "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-gray-800 text-white border border-gray-700 p-2 rounded-lg w-auto">
                  <ShadCalendar
                    mode="single"
                    selected={customDate}
                    onSelect={(date) => {
                      setCustomDate(date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      const maxDate = new Date();
                      maxDate.setDate(today.getDate() + 16);
                      return date < today || date > maxDate;
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Button
                onClick={handleDateSearch}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm flex items-center"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Check
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full overflow-hidden relative z-10">
        <Carousel
          responsive={responsive}
          infinite={false}
          arrows={true}
          keyBoardControl
          showDots={false}
          containerClass="w-full"
          itemClass="px-2 flex justify-center"
          partialVisible={false}
        >
          {displayedData.map((day, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center hover:bg-gray-800 transition duration-200 w-full mx-auto"
            >
              <div className="flex justify-center mb-2">
                {getIcon(day.weather_code)}
              </div>
              <div className="text-md font-semibold text-gray-100">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <div className="mt-2 text-gray-300 text-sm space-y-1">
                <div>🌡️ Temp: {day.expected_temp}°C</div>
                <div>⬆️ Max: {day.max_temp}°C</div>
                <div>⬇️ Min: {day.min_temp}°C</div>
                <div>💧 Humidity: {day.humidity}%</div>
                <div>🌧️ Rain: {day.rain_chance ?? "—"}%</div>
                <div>💨 Wind: {day.windspeed} m/s</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
