"use client";
import React from "react";
import { Card } from "./ui";

const Section = ({
  sectionTitle,
  screenShots,
  rowLg = 4,
  rowMd = 3,
  rowSm = 2,
  className,
  largeCard = false,
}: SectionProps) => {
  return (
    <React.Fragment>
      <div className="w-full flex items-center justify-between mt-4 lg:px-0 px-4">
        <p className="text-lg text-[#333] font-bold tracking-tighter">
          {sectionTitle}
        </p>
      </div>

      <div
        className={`w-full gap-2 grid grid-cols-1 lg:grid-cols-${rowLg} md:grid-cols-${rowMd} sm:grid-cols-${rowSm}  gap-1 my-2 lg:px-0 px-4 ${className}`}
      >
        {screenShots.map((screenShot, index) => (
          <Card
            index={index}
            title={screenShot.title}
            videoUrl={screenShot.videoUrl}
            key={screenShot.title}
            largeCard={largeCard}
            isPro={screenShot.isPro}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Section;
