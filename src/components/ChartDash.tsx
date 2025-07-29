import LineChartComponent from "./LineChart";

export default function ChartDash() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              <LineChartComponent />
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              {/* Element 2 */}
              <LineChartComponent />
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              {/* Element 3 */}
              <span className="text-white">Element 3</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              {/* Element 4 */}
              <span className="text-white">Element 4</span>
            </div>
          </div>
  );
}