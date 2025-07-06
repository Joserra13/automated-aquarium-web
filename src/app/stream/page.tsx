import DataDisplay from "@/components/DataDisplay";
import { SWRConfig } from "swr";

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
    <div className="min-h-screen dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-500 mb-4">
            Live Aquarium Stream
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Monitor your aquarium in real-time with live streaming and sensor data
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Stream Section */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
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
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  <img
                    src="/blog/the-automated-aquarium/IntroductionPicture.avif"
                    alt="Aquarium Live Stream"
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-white text-sm">
                        <span>🐠 Aquarium View</span>
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Controls */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🔄", label: "Refresh", color: "blue" },
                { icon: "📷", label: "Screenshot", color: "green" },
                { icon: "🔍", label: "Zoom", color: "purple" },
                { icon: "⚙️", label: "Settings", color: "gray" },
              ].map((control, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-${control.color}-200 dark:hover:border-${control.color}-400`}
                >
                  <div className="text-2xl mb-2">{control.icon}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {control.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sensor Data Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Live Sensors
                </h3>
              </div>

              <SWRConfig value={{ fallback }}>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <DataDisplay
                      sensor={{
                        tag: "Water Temperature",
                        key: "waterTemperature",
                      }}
                    />
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800">
                    <DataDisplay sensor={{ tag: "Times Fed Today", key: "count" }} />
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                    <DataDisplay
                      sensor={{
                        tag: "Feed Status",
                        key: "feednow",
                      }}
                    />
                  </div>
                </div>
              </SWRConfig>
            </div>

            {/* System Status */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                System Status
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Camera", status: "Online", color: "green" },
                  { label: "Sensors", status: "Active", color: "blue" },
                  { label: "Feeder", status: "Ready", color: "purple" },
                  { label: "Network", status: "Connected", color: "cyan" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {item.label}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full bg-${item.color}-100 text-${item.color}-800 dark:bg-${item.color}-900 dark:text-${item.color}-200`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
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
  );
}
