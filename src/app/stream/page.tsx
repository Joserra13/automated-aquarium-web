import RealTimeComponent from "@/components/realTime";
import LiveSensors from "@/components/LiveSensors";

export default async function Stream() {

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

          <LiveSensors />

          {/* <div className="grid lg:grid-cols-4 gap-8"> */}
          <div className="gap-8">
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
            {/* <div className="lg:col-span-1">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
