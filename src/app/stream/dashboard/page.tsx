import DataDisplay from "@/components/DataDisplay";
import { SWRConfig } from "swr";
import RealTimeComponent from "@/components/realTime";
import Link from "@/components/Link";

export default async function Dashboard() {
  const initialData = await fetch(
    "https://automated-aquarium-backend.vercel.app/dashboard",
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
    "https://automated-aquarium-backend.vercel.app/dashboard": /*initialData || */{
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
            Live Aquarium Dashboard
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Sensor Data Panel - Now on top */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold ext-white">
                  Live Sensors
                </h3>
              </div>

              <SWRConfig value={{ fallback }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-800">
                    <DataDisplay
                      sensor={{
                        tag: "Water Temperature",
                        key: "waterTemperature",
                      }}
                    />
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-800">
                    <DataDisplay sensor={{ tag: "Times Fed Today", key: "count" }} />
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-800">
                    <DataDisplay
                      sensor={{
                        tag: "Feed Status",
                        key: "feednow",
                      }}
                    />
                  </div>
                  <Link href="/stream/dashboard" className="p-4 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-800 hover:bg-cyan-500 cursor-pointer transition-colors">
                      <span className="text-lg font-bold flex items-center justify-center h-full">
                        See live data
                      </span>
                  </Link>
                </div>
              </SWRConfig>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
