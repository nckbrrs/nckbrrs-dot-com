import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AsciiBackground } from "@/components/ascii-background";
import { Menu } from "@/components/menu";

const description = "Professional software engineer and amateur creative in NYC.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nickbarrs.com"),
  title: { default: "Nick Barrs", template: "%s · Nick Barrs" },
  description,
  openGraph: { title: "Nick Barrs", description, siteName: "Nick Barrs", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fbf6f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <AsciiBackground />
        <Menu />
        {children}
      </body>
    </html>
  );
}
