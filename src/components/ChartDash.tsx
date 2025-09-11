import LineChartComponent from "./LineChartComponent";

async function fetchMongoData() {
  // const res = await fetch('http://localhost:3000/api/read-mongodb');
  const res = await fetch('https://automated-aquarium-backend.vercel.app/api/read-mongodb');
  return res.json()
}

export default async function ChartDash() {

  const data = await fetchMongoData();

  // Wait for the promises to resolve
  const [waterTemperature] = await Promise.all([data]);
  console.log(waterTemperature.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
        <LineChartComponent
          sensor={{
            tag: "Water Temperature (ºC)",
            key: "waterTemperature",
          }}
        />
      </div>
      <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
        <LineChartComponent 
          sensor={{
            tag: "Water Level (L)",
            key: "waterLevel",
          }}
        />
      </div>
      {/* <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
        <span className="text-white">Element 3</span>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
        <span className="text-white">Element 4</span>
      </div> */}
    </div>
  );
}