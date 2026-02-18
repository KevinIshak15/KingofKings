"use client";

import { useState } from "react";
import type { ListingRoom } from "@/lib/listings/types";

interface RoomsTableProps {
  rooms: ListingRoom[];
  unitsPreferenceDefault?: "imperial" | "metric" | null;
}

export function RoomsTable({ rooms, unitsPreferenceDefault = "imperial" }: RoomsTableProps) {
  const [units, setUnits] = useState<"imperial" | "metric">(unitsPreferenceDefault ?? "imperial");

  if (!rooms?.length) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-secondary">Rooms</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUnits("imperial")}
            className={`text-xs uppercase tracking-wider px-2 py-1 ${units === "imperial" ? "text-primary font-semibold border-b-2 border-primary" : "text-muted-foreground hover:text-secondary"}`}
          >
            Imperial
          </button>
          <button
            type="button"
            onClick={() => setUnits("metric")}
            className={`text-xs uppercase tracking-wider px-2 py-1 ${units === "metric" ? "text-primary font-semibold border-b-2 border-primary" : "text-muted-foreground hover:text-secondary"}`}
          >
            Metric
          </button>
        </div>
      </div>
      <div className="border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-muted-foreground">
          <thead>
            <tr className="bg-muted/50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-secondary">Level</th>
              <th className="text-left py-3 px-4 font-medium text-secondary">Room</th>
              <th className="text-left py-3 px-4 font-medium text-secondary">Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => {
              const dim = units === "metric" && room.dimensionsMetric
                ? room.dimensionsMetric
                : (room.dimensionsImperial ?? room.dimensionsMetric ?? "—");
              return (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-4">{room.level}</td>
                  <td className="py-3 px-4">{room.name}</td>
                  <td className="py-3 px-4">{dim}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
