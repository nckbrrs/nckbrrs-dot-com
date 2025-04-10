"use client";
import { useEffect, useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import Hamburger from "./Hamburger";
import ResumePDF from "../../public/resume.pdf";
import Logo from "./icons/Logo";

export default function TopNav() {
	const [fullScreenMenuIsOpen, setFullScreenMenuIsOpen] =
		useState<boolean>(false);

	const onClickHamburger = () => {
		fullScreenMenuIsOpen ? closeFullScreenMenu() : openFullScreenMenu();
	};

	const openFullScreenMenu = () => {
		setFullScreenMenuIsOpen(true);
	};

	const closeFullScreenMenu = () => {
		setFullScreenMenuIsOpen(false);
	};

	// First-render things
	useEffect(() => {
		// Handler to call on window resize
		const handleResize = () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};

		// Add event listener for resize
		window.addEventListener("resize", handleResize);

		// Call resize handler right away so state gets updated with initial window size
		handleResize();

		// Add listener to make esc key to close full-screen menu
		document.onkeydown = (event) => {
			if (event.key === "Escape") {
				closeFullScreenMenu();
			}
		};

		// Remove resize event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const links: {
		linkType: "external" | "local";
		text: string;
		href: string;
	}[] = [
		{
			linkType: "external",
			text: "bluesky",
			href: " https://bsky.app/profile/nckbrrs.bsky.social"
		},
		{
			linkType: "external",
			text: "threads",
			href: "https://threads.net/@nckbrrs"
		},
		{
			linkType: "external",
			text: "instagram",
			href: "https://www.instagram.com/nckbrrs"
		},
		{
			linkType: "external",
			text: "youtube",
			href: "https://www.youtube.com/@nckbrrs"
		},
		{
			linkType: "external",
			text: "github",
			href: "https://www.github.com/nckbrrs"
		},
		{
			linkType: "external",
			text: "linkedin",
			href: "https://www.linkedin.com/in/nckbrrs"
		},
		{
			linkType: "external",
			text: "resume",
			href: ResumePDF
		},
		{
			linkType: "external",
			text: "email",
			href: "mailto:hello@nickbarrs.com"
		}
	];

	return (
		<>
			<FullScreenMenu
				isOpen={fullScreenMenuIsOpen}
				links={links}
				onClickLink={() =>
					setTimeout(() => closeFullScreenMenu(), 1000)
				}
			/>
			<div className={topNavContainerStyling}>
				<div className={logoContainerStyling}>
					{/* <Logo className={logoStyling} /> */}
				</div>
				<div
					id="hamburgerContainer"
					className={hamburgerContainerStyling}
					onClick={onClickHamburger}
				>
					<Hamburger
						isOpen={fullScreenMenuIsOpen}
						onClick={onClickHamburger}
					/>
				</div>
			</div>
		</>
	);
}

const topNavContainerStyling = `
	flex
	flex-row
	w-full
	h-24 md:h-28
	justify-between
	items-end
  	px-6 md:px-16
`;

const logoContainerStyling = `
	flex
	flex-row
	h-12 md:h-14
	mb-2 md:mb-1
	aspect-square
`;

const logoStyling = `
	stroke-black dark:stroke-bone
	fill-black dark:fill-bone
`;

const hamburgerContainerStyling = `
	flex
	flex-col
	w-14
	h-14
	cursor-pointer
	z-20
	backdrop-blur-none
	p-2
	-mr-2
`;
