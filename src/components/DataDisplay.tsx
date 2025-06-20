"use client";

type Sensor = {
  key: string;
  value: string | number;
};

export default function DataDisplay({sensor}: { sensor: Sensor }) {

  console.log("sensor.key:", sensor.key);
  console.log("sensor.value:", sensor.value);

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold">{sensor.value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{sensor.key}</span>
    </div>
  );
}
