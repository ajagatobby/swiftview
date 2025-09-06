import React from "react";
import Section from "~/components/section";
import { animationShots } from "~/Utilities/Mock";

export default function AnimationsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
      <div className="w-full flex flex-col items-center justify-start my-8 px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
            🎬 SwiftUI Animations
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Bring your apps to life with smooth, performant animations.
          </p>
        </div>
      </div>

      {/* Animations Grid */}
      <div className="w-full">
        <Section
          sectionTitle="Basic Animations"
          screenShots={animationShots.slice(0, 6)}
          rowLg={3}
          rowMd={2}
          rowSm={1}
          className="z-50"
          largeCard={true}
        />

        <Section
          sectionTitle="Advanced Animations"
          screenShots={animationShots.slice(6, 12)}
          rowLg={3}
          rowMd={2}
          rowSm={1}
          className="z-50"
          largeCard={true}
        />
      </div>
    </div>
  );
}
