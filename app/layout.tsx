import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import "./globals.css";
import TopBar from "~/components/top-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftView",
  description: "SwiftView is a collection of SwiftUI screens for your app.",
  icons: {
    icon: "/swift.png",
  },
  openGraph: {
    title: "SwiftView",
    description: "SwiftView is a collection of SwiftUI screens for your app.",
    images: ["/site-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftView",
    description: "SwiftView is a collection of SwiftUI screens for your app.",
    images: ["/site-banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Script
          id="posthog-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_45EuhUjqhOKVAIo3cIGPMpq1Gf5feTq3VlQkSnqYkGI',{api_host:'https://us.i.posthog.com', defaults:'2025-05-24'})
          `,
          }}
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} relative antialiased w-full lg:max-w-screen-xl md:max-w-screen-lg max-w-screen-sm mx-auto pt-16`}
        >
          {/* Glowing gradient at the top */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-400/20 via-blue-500/10 to-transparent blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-400/5 via-blue-600/10 to-transparent blur-3xl"></div>

          <TopBar />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
