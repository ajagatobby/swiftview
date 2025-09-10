import Section from "~/components/section";
import { Sparkle } from "~/components/icons";
import { getGroupedAnimationProjects } from "~/lib/actions";
import { convertProjectsToScreenShots, formatSectionName } from "~/lib/utils";

export default async function AnimationsPage() {
  try {
    const groupedProjects = await getGroupedAnimationProjects();

    const sections = Object.entries(groupedProjects).map(
      ([sectionKey, projects]) => ({
        title: formatSectionName(sectionKey).replace("screens", "animations"),
        screenShots: convertProjectsToScreenShots(projects),
        key: sectionKey,
      })
    );

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
        <div className="w-full flex flex-col items-center justify-start my-4">
          <p className="lg:text-2xl text-xl font-bold tracking-tight text-gray-900 text-center">
            🎬 SwiftUI Animations
          </p>
          <p className="lg:text-base text-sm text-center text-gray-500">
            Bring your apps to life with smooth, performant animations.
          </p>
        </div>

        {sections.length > 0 ? (
          sections.map((section) => (
            <Section
              key={section.key}
              sectionTitle={section.title}
              screenShots={section.screenShots}
              rowLg={3}
              rowMd={2}
              rowSm={1}
              className="z-50"
              largeCard={true}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Sparkle size={48} className="text-gray-300" />
              <p className="text-lg text-gray-500 text-center">
                No animations available at the moment.
              </p>
              <p className="text-sm text-gray-400 text-center">
                Check back later for new SwiftUI animations!
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading animations:", error);

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
        <div className="w-full flex flex-col items-center justify-start my-4">
          <p className="lg:text-2xl text-xl font-bold tracking-tight text-gray-900 text-center">
            🎬 SwiftUI Animations
          </p>
          <p className="lg:text-base text-sm text-center text-gray-500">
            Bring your apps to life with smooth, performant animations.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <Sparkle size={48} className="text-gray-300" />
            <p className="text-lg text-red-500 text-center">
              Failed to load animations.
            </p>
            <p className="text-sm text-gray-400 text-center">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
