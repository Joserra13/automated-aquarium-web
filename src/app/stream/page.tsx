export default function Stream() {

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4 sm:p-8 pb-12 sm:pb-20 gap-8 sm:gap-16 sm:pt-32 px-4 sm:px-12 md:px-32">
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Data section */}
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Aquarium Status</h2>
            <p className="text-gray-500 dark:text-gray-400">Live stream and sensor data</p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">24°C</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Temperature</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">7.2</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">pH Level</span>
            </div>
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