import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    <html lang="en">
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
  );
}
