import React from "react";
import Section from "~/components/section";
import { welcomeScreenShots } from "~/Utilities/Mock";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
      <Section
        sectionTitle="Mini Apps"
        screenShots={welcomeScreenShots}
        rowLg={3}
        rowMd={3}
        rowSm={2}
        className="z-50"
        largeCard={true}
      />
    </div>
  );
}
