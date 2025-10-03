import React from "react";
import Section from "~/components/section";
import { miniAppsData } from "~/Utilities/Mock";
import {
  filterContentBySubscription,
  getCurrentUserSubscription,
} from "~/lib/utils";

export default async function Page() {
  const { isPro } = await getCurrentUserSubscription();
  const filteredMiniApps = filterContentBySubscription(miniAppsData, isPro);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
      <Section
        sectionTitle="Mini Apps"
        screenShots={filteredMiniApps}
        rowLg={3}
        rowMd={3}
        rowSm={2}
        className="z-50"
        largeCard={true}
        userIsPro={isPro}
      />
    </div>
  );
}
