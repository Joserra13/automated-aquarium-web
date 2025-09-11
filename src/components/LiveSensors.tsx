"use client";
import DataDisplay from "@/components/DataDisplay";
import { SWRConfig } from "swr";
import Link from "@/components/Link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function LiveSensors() {

  const [updateDate, setUpdateDate] = useState(new Date().toLocaleTimeString());
  const pathname = usePathname();

  function handleDataUpdate(timestamp: string) {
    setUpdateDate(timestamp);
  }

  const fallback = {
    "https://automated-aquarium-backend.vercel.app/fishFeeder": {
      schedule0Enabled: true,
      feednow: false,
      schedule2Enabled: false,
      schedule2: "00:00",
      schedule1Enabled: false,
      schedule0: "00:00",
      schedule1: "00:00",
      count: 0,
      waterTemperature: 0.00,
      waterLevel: 0
    },
  };

  return (
    <div className="mb-8">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">📊</span>
          </div>
          <h3 className="text-xl font-bold ext-white">Live Sensors</h3>
          <div className="justify-end mt-2">
            <p className="text-gray-400 text-sm">Last update: {updateDate}</p>
          </div>
        </div>

        <SWRConfig value={{ fallback }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-800">
              <DataDisplay
                sensor={{
                  tag: "Water Temperature (ºC)",
                  key: "waterTemperature",
                }}
                onDataUpdateAction={handleDataUpdate}
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-800">
              <DataDisplay
                sensor={{ tag: "Times Fed Today", key: "count" }}
                onDataUpdateAction={handleDataUpdate}
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-800">
              <DataDisplay
                sensor={{
                  tag: "Water Level (L)",
                  key: "waterLevel",
                }}
                onDataUpdateAction={handleDataUpdate}
              />
            </div>
            <Link
              href={`${pathname === "/stream" ? "/stream/dashboard" : "/stream"}`}
              className="p-4 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-800 hover:bg-cyan-500 cursor-pointer transition-colors"
            >
              <span className="text-lg font-bold flex items-center justify-center h-full">
                {`${pathname === "/stream" ? "See live data" : "Watch stream"}`}
              </span>
            </Link>
          </div>
        </SWRConfig>
      </div>
    </div>
  );
}
