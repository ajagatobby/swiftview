import Section from "~/components/section";
import TopBar from "~/components/top-bar";
import { signInScreenShots, welcomeScreenShots } from "~/Utilities";
import { onboardingScreenShots } from "~/Utilities/Mock/onboarding-screen";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start lg:max-w-screen-xl md:max-w-screen-lg max-w-screen-sm mx-auto pb-20">
      <TopBar />

      <div className="w-full flex flex-col items-center justify-start my-4">
        <p className="lg:text-2xl text-xl font-bold tracking-tight text-center">
          👋 Free SwiftUI Screens
        </p>
        <p className="lg:text-base text-sm text-center text-gray-500">
          Speed up development with ready-to-use screens.
        </p>
      </div>

      <Section
        sectionTitle="Welcome screens"
        screenShots={welcomeScreenShots}
      />
      <Section sectionTitle="Sign in screens" screenShots={signInScreenShots} />
      <Section
        sectionTitle="Onboarding screens"
        screenShots={onboardingScreenShots}
      />
    </div>
  );
}
