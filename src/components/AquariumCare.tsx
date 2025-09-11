import { getLatestWaterCare } from "@/lib/aquarium-care";

export default async function AquariumCare() {

  let waterCareData = await getLatestWaterCare();
  const today = new Date().toISOString().split('T')[0];
  waterCareData = waterCareData?.sort((a, b) => a.id - b.id) ?? null;
  console.log("Latest Water Care Data:", waterCareData);

  const oneDayMs = 24 * 60 * 60 * 1000; // 1 day in ms
  const oneWeekMs = 7 * oneDayMs; // 1 week in ms
  const threeWeeksMs = 3 * oneWeekMs // 3 weeks in ms
  const threeDaysMs = 3 * oneDayMs;
  const oneMonthMS = 4 * oneWeekMs;
  const twoMonthsMs = 2 * oneMonthMS;

  waterCareData?.forEach((event) => {
    const eventTime = event['event-time'].toISOString().split('T')[0]
    const diffMs = Math.abs(new Date(today).getTime() - new Date(eventTime).getTime());

    switch (event['event-name']) {
      case 'replace-water':
        if (diffMs >= threeWeeksMs) {
          event['status'] = true;
        } else {
          event['status'] = false;
        }
        break;
      case 'stability':
        if (diffMs >= oneWeekMs) {
          event['status'] = true;
        } else {
          event['status'] = false;
        }
        break;
      case 'fertilizer':
        if (diffMs >= threeDaysMs) {
          event['status'] = true;
        } else {
          event['status'] = false;
        }
        break;
      case 'sponge':
      case 'carbon':
        if (diffMs >= twoMonthsMs) {
          event['status'] = true;
        } else {
          event['status'] = false;
        }
        break;
      default:
        event['status'] = false;
        break;
    }
  });

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
            <div className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500  rounded-xl flex flex-col" title="Change water every 3 weeks">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
                <span role="img" aria-label="Water Change">💧</span>
                Water Change
              </span>
              <span
                className={`text-lg ${waterCareData && waterCareData[0]['status'] ? 'text-red-700' : 'text-white'}`}
              >
                {waterCareData ? waterCareData[0]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
              <span className="text-xs text-gray-300 mt-1">Next change on {waterCareData ? new Date(waterCareData[0]['event-time'].getTime() + threeWeeksMs).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-xl flex flex-col" title="Add stability liquid weekly">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
                <span role="img" aria-label="Stability">🧪</span>
                Stability
              </span>
              <span
                className={`text-lg ${waterCareData && waterCareData[1]['status'] ? 'text-red-700' : 'text-white'}`}
              >
                {waterCareData ? waterCareData[1]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
              <span className="text-xs text-gray-300 mt-1">Next change on {waterCareData ? new Date(waterCareData[1]['event-time'].getTime() + oneWeekMs).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white rounded-xl flex flex-col" title="Add fertilizer twice a week">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
                <span role="img" aria-label="Fertilizer">🧴</span>
                Fertilizer
              </span>
              <span
                className={`text-lg ${waterCareData && waterCareData[2]['status'] ? 'text-red-700' : 'text-white'}`}
              >
                {waterCareData ? waterCareData[2]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
              <span className="text-xs text-gray-300 mt-1">Next change on {waterCareData ? new Date(waterCareData[2]['event-time'].getTime() + threeDaysMs).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-yellow-300 to-green-700 text-white rounded-xl flex flex-col" title="Change sponge filter every 2 months">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
                <span role="img" aria-label="Fertilizer">🧴</span>
                Filter: Sponge
              </span>
              <span
                className={`text-lg ${waterCareData && waterCareData[3]['status'] ? 'text-red-700' : 'text-white'}`}
              >
                {waterCareData ? waterCareData[3]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
              <span className="text-xs text-gray-300 mt-1">Next change on {waterCareData ? new Date(waterCareData[3]['event-time'].getTime() + twoMonthsMs).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
            <div className="w-full p-4 bg-gradient-to-r from-black to-gray-400 text-white rounded-xl flex flex-col" title="Change carbon filter every 2 months">
              <span className="text-base mb-1 flex items-center gap-2 font-bold">
                <span role="img" aria-label="Fertilizer">🧴</span>
                Filter: Carbon
              </span>
              <span
                className={`text-lg ${waterCareData && waterCareData[4]['status'] ? 'text-red-700' : 'text-white'}`}
              >
                {waterCareData ? waterCareData[4]['event-time'].toISOString().split('T')[0] : 'N/A'}
              </span>
              <span className="text-xs text-gray-300 mt-1">Next change on {waterCareData ? new Date(waterCareData[4]['event-time'].getTime() + twoMonthsMs).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}