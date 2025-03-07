import "~/styles/globals.css";
import { Viewport, type Metadata } from "next";
import TopNav from "~/components/TopNav";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { Config } from "tailwindcss";
import Footer from "~/components/Footer";

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
		<html lang="en" className={htmlContainerStyling}>
			<body className={bodyContainerStyling}>
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
`;

const bodyContainerStyling = `
	flex
	flex-col
	h-screen
	w-full
	items-center
	bg-bone dark:bg-black
	max-w-[2000px]
`;
