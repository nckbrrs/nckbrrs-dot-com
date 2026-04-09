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

	useEffect(() => {
		if (isOpen && menuVideoRef.current) {
			const videos = Array.from(document.querySelectorAll("video"));
			const layoutVideo = videos.find((v) => v !== menuVideoRef.current);
			if (layoutVideo) {
				menuVideoRef.current.currentTime = layoutVideo.currentTime;
				menuVideoRef.current.playbackRate = layoutVideo.playbackRate;
			}
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
				<BackgroundVideo ref={menuVideoRef} className="z-0" />
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
