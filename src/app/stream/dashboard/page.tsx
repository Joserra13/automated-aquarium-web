import LiveSensors from "@/components/LiveSensors";
import ChartDash from "@/components/ChartDash";

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

          <LiveSensors />
          
          <ChartDash />

        </div>
      </div>
    </div>
  );
}
