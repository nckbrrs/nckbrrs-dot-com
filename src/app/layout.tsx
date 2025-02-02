import "~/styles/globals.css";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/next";
import { Viewport, type Metadata } from "next";
import TopNav from "~/components/TopNav";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { Config } from "tailwindcss";

const twFullConfig = resolveConfig(
	tailwindConfig as Config & typeof tailwindConfig
);

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
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: twFullConfig.theme.colors["bone"]
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: twFullConfig.theme.colors["black"]
		}
	]
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={bodyContainerStyling}>
				<TopNav />
				{children}
				{/* <SpeedInsights /> */}
				{/* <Analytics /> */}
			</body>
		</html>
	);
}

const bodyContainerStyling = `
	flex
	flex-col
	h-screen
	bg-bone dark:bg-black
`;
