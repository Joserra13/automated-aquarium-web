"use client";

import Image from "next/image";
import { SocialIcons } from "@/components/Social-Icons";
import { allAbouts, About } from "contentlayer2/generated";
import { getMDXComponent } from "next-contentlayer2/hooks";

function AboutContent(about: About) {
  const Content = getMDXComponent(about.body.code);
  return <Content />;
}

export default function AboutPage() {
  const posts = allAbouts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 pb-12 sm:pb-20 gap-8 sm:gap-16 px-4 sm:px-12 md:px-32">
      {/* About the Project Section */}
      <div className="bg-[rgb(42,52,73)] w-full rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mt-8 text-cyan-500">
          About the project
        </h1>
        <div className="divide-y divide-gray-200">
          <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-x-8 items-center p-4 sm:p-8">
            <div className="prose prose-invert max-w-none pt-8 pb-8 xl:col-span-2 text-justify">
              <AboutContent {...posts[1]} />
            </div>
            <div className="flex flex-col items-center pt-8 pb-8">
              <Image
                src="/blog/the-automated-aquarium/IntroductionPicture.avif"
                alt="avatar"
                width={256}
                height={256}
                className="h-48 w-48 sm:h-64 sm:w-64 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-[rgb(42,52,73)] w-full rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mt-8 text-cyan-500">
          About Me
        </h1>
        <div className="divide-y divide-gray-200">
          <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-x-8 items-center p-4 sm:p-8">
            <div className="flex flex-col items-center pt-8 pb-8">
              <Image
                src="/aboutMe.avif"
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
              <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
                Joserra
              </h3>
                <div className="text-gray-400 text-center">
                  SW Developer | MSc in IoT & Telecommunications Engineer
                </div>
              <div className="flex space-x-3 pt-6">
                <SocialIcons />
              </div>
            </div>
            <div className="prose prose-invert max-w-none pt-8 pb-8 xl:col-span-2 text-justify">
              <AboutContent {...posts[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
