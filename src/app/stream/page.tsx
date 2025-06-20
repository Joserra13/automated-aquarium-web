import DataDisplay from "@/components/DataDisplay";
import { Suspense } from "react";

export default async function Stream() {
  const query = await fetch("https://automated-aquarium-backend.vercel.app/fishFeeder", {
  // const query = await fetch("http://localhost:3000/fishFeeder", {
    headers: new Headers({
      "api-key": `${process.env.BACKEND_API_KEY}`,
    }),
    next: { revalidate: 3 }, // Revalidate every 60 seconds
  });
  const fishFeeder = await query.json();

  console.log("FishFeeder Data:", fishFeeder);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4 sm:p-8 pb-12 sm:pb-20 gap-8 sm:gap-16 sm:pt-25 px-4 sm:px-12 md:px-16">
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Data section */}
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Aquarium Status</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Live stream and sensor data
            </p>
          </div>
          <div className="flex gap-6">
            <Suspense>
              <DataDisplay
                sensor={{
                  key: "Temperature (ºC)",
                  value: fishFeeder.waterTemperature
                    ? fishFeeder.waterTemperature.toFixed(2)
                    : "N/A",
                }}
              />
              <DataDisplay
                sensor={{ key: "Times Fed", value: fishFeeder.count ?? "N/A" }}
              />
              <DataDisplay
                sensor={{
                  key: "feednow",
                  value:
                    fishFeeder.feednow !== undefined
                      ? fishFeeder.feednow.toString()
                      : "N/A",
                }}
              />
            </Suspense>
          </div>
        </div>
        {/* Big picture section */}
        <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
          {/* Replace src with your stream or image */}
          <img
            src="/blog/the-automated-aquarium/IntroductionPicture.jpg"
            alt="Aquarium Stream"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
