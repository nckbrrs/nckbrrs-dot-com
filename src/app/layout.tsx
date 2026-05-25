import "~/app/globals.css";
import { type Viewport, type Metadata } from "next";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import Grain from "~/components/Grain";
import MobileEdgeFades from "~/components/MobileEdgeFades";
import { FADE_COLOR } from "~/lib/colors";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://nckbrrs.com"
  ),
  title: "Nick Barrs",
  description: "Professional software engineer and amateur creative in NYC.",
  openGraph: {
    title: "Nick Barrs",
    description: "Professional software engineer and amateur creative in NYC.",
    siteName: "Nick Barrs",
    type: "website",
    images: [{ url: "/open-graph-image.png", width: 1200, height: 630, alt: "Preview image for nckbrrs.com" }],
  },
};

export const viewport: Viewport = {
  themeColor: FADE_COLOR,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="flex flex-row justify-center h-full min-h-dvh bg-(--bg-fade)"
      style={{ "--bg-fade": FADE_COLOR } as React.CSSProperties}
    >
      <body className="flex flex-col overflow-hidden w-full h-full items-center max-w-[2000px]">
        <Grain />
        <MobileEdgeFades className="fixed inset-0 -z-10" />
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
