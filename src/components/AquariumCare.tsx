import { getLatestWaterCare } from "@/lib/aquarium-care";

export default async function AquariumCare() {

  const waterCareData = await getLatestWaterCare();
  console.log("Latest Water Care Data:", waterCareData);

  return (
    <>
      {/* Aquarium Care - Now on the right side */}
      <div className="lg:col-span-1" >
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎮</span>
            </div>
            Aquarium Care
          </h3>

          <div className="space-y-3">
            <div className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl flex flex-col">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
              <span role="img" aria-label="Water Change">💧</span>
              Water Change
              </span>
              <span className="text-lg">
              {waterCareData ? waterCareData[0]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-xl flex flex-col">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
              <span role="img" aria-label="Stability">🧪</span>
              Stability
              </span>
              <span className="text-lg">
              {waterCareData ? waterCareData[1]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white rounded-xl flex flex-col">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
              <span role="img" aria-label="Fertilizer">🧴</span>
              Fertilizer
              </span>
              <span className="text-lg">
              {waterCareData ? waterCareData[2]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}