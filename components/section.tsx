"use client";
import React from "react";
import { Card } from "./ui";

const Section = ({ sectionTitle, screenShots }: SectionProps) => {
  return (
    <React.Fragment>
      <div className="w-full flex items-center justify-between mt-2 lg:px-0 px-4">
        <p className="text-lg text-[#333]">{sectionTitle}</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-1 my-2 lg:px-0 px-4">
        {screenShots.map((screenShot, index) => (
          <Card
            index={index}
            title={screenShot.title}
            image={screenShot.image}
            link={screenShot.link}
            appName={screenShot.appName}
            videoUrl={screenShot.videoUrl}
            key={screenShot.title}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Section;
