import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSkeleton({ height = 80 }) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Loader2 className="animate-spin text-blue-400 w-8 h-8" />
      <div className="w-full max-w-4xl animate-pulse">
        <div className="h-6 bg-gray-800 rounded mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-20 bg-gray-800 rounded" />
          <div className="h-20 bg-gray-800 rounded" />
          <div className="h-20 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}
