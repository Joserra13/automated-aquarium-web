type Sensor = {
  key: string;
  value: string | number;
};

export default function DataDisplay({sensor}: { sensor: Sensor }) {

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold">{sensor.value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{sensor.key}</span>
    </div>
  );
}
