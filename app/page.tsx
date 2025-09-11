import Section from "~/components/section";
import { getGroupedScreenProjects } from "~/lib/actions";
import { convertProjectsToScreenShots, formatSectionName } from "~/lib/utils";

export default async function Home() {
  try {
    const groupedProjects = await getGroupedScreenProjects();

    const sections = Object.entries(groupedProjects).map(
      ([sectionKey, projects]) => ({
        title: formatSectionName(sectionKey),
        screenShots: convertProjectsToScreenShots(projects),
        key: sectionKey,
      })
    );

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
        <div className="w-full flex flex-col items-center justify-start my-4">
          <p className="lg:text-2xl text-xl font-bold tracking-tight text-gray-900 text-center">
            👋 Free SwiftUI Screens
          </p>
          <p className="lg:text-base text-sm text-center text-gray-500">
            Speed up development with ready-to-use screens.
          </p>
        </div>

        {sections.length > 0 ? (
          sections.map((section) => (
            <Section
              key={section.key}
              sectionTitle={section.title}
              screenShots={section.screenShots}
              rowLg={3}
              rowMd={3}
              rowSm={2}
              largeCard={true}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <p className="text-lg text-gray-500 text-center">
              No screens available at the moment.
            </p>
            <p className="text-sm text-gray-400 text-center mt-2">
              Check back later for new SwiftUI screens!
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading screens:", error);

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
        <div className="w-full flex flex-col items-center justify-start my-4">
          <p className="lg:text-2xl text-xl font-bold tracking-tight text-gray-900 text-center">
            👋 Free SwiftUI Screens
          </p>
          <p className="lg:text-base text-sm text-center text-gray-500">
            Speed up development with ready-to-use screens.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-12">
          <p className="text-lg text-red-500 text-center">
            Failed to load screens.
          </p>
          <p className="text-sm text-gray-400 text-center mt-2">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }
}
