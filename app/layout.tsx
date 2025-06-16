import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
