"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok: " + res.statusText);
    }
    return res.json();
  });

type Sensor = {
  key: string;
  tag: string;
};

export default function DataDisplay({ sensor }: { sensor: Sensor }) {
  const { data } = useSWR(
    "/api/getFishFeederData",
    fetcher,{
      refreshInterval: 1000, 
      revalidateOnFocus: true, 
      dedupingInterval: 2000
    }
  );

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold">
        {sensor.key === "waterTemperature"
          ? data && data[sensor.key] !== undefined
            ? data[sensor.key].toFixed(2)
            : "N/A"
          : data && data[sensor.key] !== undefined
            ? data[sensor.key].toString()
            : "N/A"}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {sensor.tag}
      </span>
    </div>
  );
}
