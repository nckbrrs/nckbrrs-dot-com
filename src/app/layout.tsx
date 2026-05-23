import "~/styles/globals.css";
import { Viewport, type Metadata } from "next";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import Background from "~/components/Background";
import { BG_COLOR, FADE_COLOR } from "~/lib/colors";

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NODE_ENV == "development"
			? "http://localhost:3000"
			: "https://nckbrrs.com"
	),
	title: "Nick Barrs",
	description: "Professional software engineer and amateur creative in NYC.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
	openGraph: {
		title: "Nick Barrs",
		description:
			"Professional software engineer and amateur creative in NYC.",
		siteName: "Nick Barrs",
		type: "website",
		images: [
			{
				url: "/open-graph-img.png",
				width: 1200,
				height: 630,
				alt: "Preview image for nckbrrs.com"
			}
		]
	}
};

export const viewport: Viewport = {
	themeColor: FADE_COLOR
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={htmlContainerStyling} style={{ "--bg-fade": FADE_COLOR } as React.CSSProperties}>
			<body className={bodyContainerStyling}>
				<Background />
				<TopNav />
				{children}
				<Footer />
			</body>
		</html>
	);
}

const htmlContainerStyling = `
	flex
	flex-row
	justify-center
	h-full
	min-h-100dvh
	bg-[var(--bg-fade)]
`;

const bodyContainerStyling = `
	flex
	flex-col
	overflow-hidden
	w-full
	items-center
	max-w-[2000px]
`;
