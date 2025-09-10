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
            <div className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold ">
              {`💧 Water Change: ${waterCareData ? waterCareData[0]['event-time'] : 'N/A'}`}
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold ">
              {`🧪 Stability: ${waterCareData ? waterCareData[1]['event-time'] : 'N/A'}`}
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold ">
              {`🧴 Fertilizer: ${waterCareData ? waterCareData[2]['event-time'] : 'N/A'}`}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}