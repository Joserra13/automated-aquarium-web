import DataDisplay from "@/components/DataDisplay";
import { SWRConfig } from "swr";
import RealTimeComponent from "@/components/realTime";
import Link from "@/components/Link";
import AquariumCare from "@/components/AquariumCare";
import LiveSensors from "@/components/LiveSensors";

export default async function Stream() {
  const initialData = await fetch(
    "https://automated-aquarium-backend.vercel.app/fishFeeder",
    {
      // const query = await fetch("http://localhost:3000/fishFeeder", {
      headers: new Headers({
        "api-key": `${process.env.BACKEND_API_KEY}`,
      }),
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching initial data:", error);
      return null;
    });

  const fallback = {
    "https://automated-aquarium-backend.vercel.app/fishFeeder": initialData || {
      schedule0Enabled: true,
      feednow: false,
      schedule2Enabled: false,
      schedule2: "00:00",
      schedule1Enabled: false,
      schedule0: "00:00",
      schedule1: "00:00",
      count: 31,
      waterTemperature: 0.62842,
    },
  };

  return (
    <div className="min-h-screen from-gray-900 via-gray-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-500 mb-4">
            Live Aquarium Stream
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Monitor your aquarium in real-time with live streaming and sensor data
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          
          <LiveSensors/>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Stream Section */}
            <div className="lg:col-span-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-25"></div>
                <div className="relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-white font-semibold">Live Stream</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-700 relative overflow-hidden">
                    <img
                      src="Streaming.gif"
                      alt="Aquarium Live Stream"
                      className="object-cover w-full h-full transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>🐠 Aquarium View</span>
                          <RealTimeComponent />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AquariumCare/>
          </div>
        </div>
      </div>
    </div>
  );
}
