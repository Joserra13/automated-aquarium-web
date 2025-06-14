import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 pb-16 gap-8 sm:gap-16 pt-16 sm:px-32 mb-8">
      {/* Welcome Section */}
      <div
        className="flex flex-col gap-4 items-center justify-center text-center w-full h-64 sm:h-96"
        style={{
          backgroundImage: "url('/welcomePicture.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30vh",
        }}
      >
        <div
          style={{ backgroundColor: "rgba(17, 24, 39, 0.75)" }}
          className="p-4 sm:p-8"
        >
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Welcome to your new Automated Aquarium
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full max-w-8xl">
        {/* Card 1 */}
        <div className="flex flex-col gap-4 items-center bg-transparent text-sm py-4 px-4 border border-cyan-700 rounded-lg w-full sm:w-1/3 font-[family-name:var(--font-geist-mono)]">
          <Image
            className="invert"
            src="/code.svg"
            alt="code icon"
            width={80}
            height={80}
            priority
          />
          <p className="text-center">
            This Automated Aquarium is a side project involving different
            technologies where the main area is Internet of Things (IoT).
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col gap-4 items-center bg-transparent text-sm py-4 px-4 border border-cyan-700 rounded-lg w-full sm:w-1/3">
          <NewsletterForm
            title="Subscribe to the Automated Aquarium Newsletter"
            description="Get notified when new content is published. No spam, unsubscribe anytime."
            buttonText="Subscribe"
            errorMessage="An error occurred. Please try again."
            successMessage="Thanks for subscribing!"
            inputPlaceholder="Enter your email"
          />
        </div>

        {/* Card 3 */}
        <div className="flex flex-col gap-4 items-center bg-transparent text-sm py-4 px-4 border border-cyan-700 rounded-lg w-full sm:w-1/3 font-[family-name:var(--font-geist-mono)]">
          <Image
            className="invert"
            src="/in-work.svg"
            alt="In work icon"
            width={80}
            height={80}
            priority
          />
          <p className="text-center">
            You will be able to keep track of the progress of this project and
            see updates as new features are added. Stay tuned for more exciting
            developments!
          </p>
        </div> 
      </main>
    </div>
  );
}
