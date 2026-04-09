"use client";

import { forwardRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const BackgroundVideo = forwardRef<HTMLVideoElement, { className?: string }>(
	function BackgroundVideo({ className }, ref) {
		const internalRef = useRef<HTMLVideoElement>(null);
		const videoRef =
			(ref as React.RefObject<HTMLVideoElement>) ?? internalRef;

		useEffect(() => {
			if (videoRef.current) {
				videoRef.current.playbackRate = 2;
				videoRef.current.play().catch(() => {
					// Autoplay blocked by browser
				});
			}
		}, [videoRef]);

		const handleLoaded = () => {
			if (videoRef.current) {
				videoRef.current.playbackRate = 2;
				videoRef.current.play().catch(() => {});
			}
		};

		return (
			<video
				ref={videoRef}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				onLoadedMetadata={handleLoaded}
				onCanPlay={handleLoaded}
				className={twMerge(
					"fixed inset-0 w-full h-full object-cover object-top -z-10 opacity-90 dark:opacity-50 -scale-x-100",
					className
				)}
			>
				<source src="/sky_compressed.mp4" type="video/mp4" />
			</video>
		);
	}
);

export default BackgroundVideo;
