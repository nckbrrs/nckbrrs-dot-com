"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BackgroundVideo from "./BackgroundVideo";

interface FullScreenMenuProps {
	isOpen: boolean;
	links: { linkType: "external" | "local"; text: string; href: string }[];
	onClickLink: () => void;
}

export default function FullScreenMenu({
	isOpen,
	links,
	onClickLink
}: FullScreenMenuProps) {
	const menuVideoRef = useRef<HTMLVideoElement>(null);
	// Tracks whether the menu has ever been opened. Used to skip the
	// "closing" branch of the effect on initial mount, since running it
	// at mount would reset the layout video's currentTime to 0.
	const hasOpenedRef = useRef(false);

	useEffect(() => {
		// Mobile browsers only allow one video to play at a time. Since we can't
		// render a single shared video element, we hand off playback between them
		// whenever the menu opens or closes.
		const layoutVideo = Array.from(document.querySelectorAll("video")).find(
			(v) => v !== menuVideoRef.current
		);

		if (isOpen) {
			hasOpenedRef.current = true;
			if (menuVideoRef.current && layoutVideo) {
				// Sync position and speed from the layout video before playing
				// so the transition looks seamless.
				menuVideoRef.current.currentTime = layoutVideo.currentTime;
				menuVideoRef.current.playbackRate = layoutVideo.playbackRate;
				layoutVideo.pause();
				menuVideoRef.current.play().catch(() => {});
			}
		} else if (hasOpenedRef.current) {
			// Hand the current timestamp back to the layout video before
			// resuming it so there's no jump when the menu closes.
			if (menuVideoRef.current && layoutVideo) {
				layoutVideo.currentTime = menuVideoRef.current.currentTime;
			}
			menuVideoRef.current?.pause();
			layoutVideo?.play().catch(() => {});
		}
	}, [isOpen]);

	return (
		<motion.div
			className={fullScreenMenuContainerStyling}
			animate={{
				opacity: isOpen ? 1 : 0,
				pointerEvents: isOpen ? "auto" : "none"
			}}
			initial={{ opacity: 0, pointerEvents: "none" }}
			transition={{ duration: 0.2 }}
		>
			<div className="absolute inset-0 bg-black" />
			<motion.div
				animate={{ opacity: 0.6 }}
				initial={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<BackgroundVideo
					ref={menuVideoRef}
					className="z-0"
					controlled
				/>
			</motion.div>
			<div className={menuLinksColStyling}>
				{links.map((l) => (
					<Link
						className={linkTextStyling}
						key={l.text}
						href={`${l.href}`}
						target={l.linkType === "external" ? "_blank" : ""}
						rel={
							l.linkType === "external"
								? "noopener noreferrer"
								: ""
						}
						onClick={onClickLink}
					>
						{l.text.toUpperCase()}
					</Link>
				))}
			</div>
			<button
				onClick={() =>
					document.documentElement.classList.toggle("plain-mode")
				}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-50 hover:opacity-100 transition-opacity duration-200"
				aria-label="Toggle plain mode"
			>
				<svg
					viewBox="0 0 24 24"
					className="w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<clipPath id="cloud-left-half">
							<rect x="0" y="0" width="12" height="24" />
						</clipPath>
					</defs>
					<path
						d="M6.5 19a4.5 4.5 0 0 1 0-9h.5a5 5 0 0 1 9.9-1A4.5 4.5 0 0 1 17.5 19z"
						className="fill-none stroke-bone"
						strokeWidth="1.5"
					/>
					<path
						d="M6.5 19a4.5 4.5 0 0 1 0-9h.5a5 5 0 0 1 9.9-1A4.5 4.5 0 0 1 17.5 19z"
						className="fill-bone"
						stroke="none"
						clipPath="url(#cloud-left-half)"
					/>
				</svg>
			</button>
		</motion.div>
	);
}

const fullScreenMenuContainerStyling = `
    flex
	flex-row
    w-full
    h-full
	text-bone
    left-0
    top-0
    justify-center
    items-center
    fixed
    z-20
    overflow-hidden
`;

const menuLinksColStyling = `
    flex
    flex-col
    flex-wrap
    group
    items-start
    justify-center
    space-y-0 lg:space-y-1
    translate-y-2
	relative
`;

const linkTextStyling = `
	w-full
    text-4xl md:text-5xl lg:text-7xl
    font-bold
	italic
	text-left
    duration-200
    group-hover:opacity-25
    group-hover:blur-[2px]
    hover:!opacity-100
    hover:!blur-0
	hover:translate-x-3
`;
