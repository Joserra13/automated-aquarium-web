"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    headers: new Headers({
      "api-key": `${process.env.BACKEND_API_KEY}`,
    }),
    next: { revalidate: 3 }, // Revalidate every 3 seconds
  }).then((res) => res.json());

type Sensor = {
  key: string;
  tag: string;
};

export default function DataDisplay({ sensor }: { sensor: Sensor }) {
  const { data } = useSWR(
    "https://automated-aquarium-backend.vercel.app/fishFeeder",
    fetcher
  );

  console.log("DataDisplay Data:", data);

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
