import DataDisplay from "@/components/DataDisplay";
import { SWRConfig } from "swr";
import RealTimeComponent from "@/components/realTime";
import Link from "@/components/Link";

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
                      src="/blog/the-automated-aquarium/IntroductionPicture.avif"
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

            {/* Quick Actions - Now on the right side */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🎮</span>
                  </div>
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    🐠 Feed Fish Now
                  </button>
                  <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    📅 Schedule Feeding
                  </button>
                  <button className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    📊 View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
