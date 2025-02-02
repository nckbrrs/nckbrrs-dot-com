"use client";
import { useEffect, useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import Hamburger from "./Hamburger";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
			linkType: "local",
			text: "Home",
			href: "/"
		},
		{
			linkType: "local",
			text: "Portfolio",
			href: "/portfolio"
		},
		{
			linkType: "local",
			text: "Inquiries",
			href: "/inquiry"
		},
		{
			linkType: "local",
			text: "Contact",
			href: "/contact"
		}
	];

	return (
		<>
			<FullScreenMenu
				isOpen={fullScreenMenuIsOpen}
				links={links}
				onClickLink={() => closeFullScreenMenu()}
			/>
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
		</>
	);
}

const hamburgerContainerStyling = `
	flex
	flex-col
	w-12
	h-12
	cursor-pointer
	duration-75
	hover:scale-110
	fixed
	right-4 md:right-6 lg:right-8
	top-6 md:top-10 lg:top-14
	z-20
	backdrop-blur-none
	p-2
	rounded-md
`;
