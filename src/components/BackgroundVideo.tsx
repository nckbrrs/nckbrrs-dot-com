"use client";

import { forwardRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const BackgroundVideo = forwardRef<
	HTMLVideoElement,
	{ className?: string; controlled?: boolean }
>(function BackgroundVideo({ className, controlled = false }, ref) {
	const internalRef = useRef<HTMLVideoElement>(null);
	const videoRef =
		(ref as React.RefObject<HTMLVideoElement>) ?? internalRef;

	useEffect(() => {
		// Fallback for browsers where autoPlay is blocked and the canplay
		// event fires before React attaches handlers (e.g. a cached video
		// that's instantly ready). Not redundant with onCanPlay below.
		if (controlled || !videoRef.current) return;
		videoRef.current.playbackRate = 2;
		videoRef.current.play().catch(() => {});
	}, [videoRef, controlled]);

	const handleCanPlay = () => {
		// Primary mobile play trigger. autoPlay alone is often blocked on
		// mobile; explicitly calling play() inside a browser-fired event is
		// more reliably permitted. Also sets playbackRate since autoPlay
		// doesn't expose a way to configure that before playback starts.
		// When controlled=true, the parent (FullScreenMenu) owns playback.
		if (controlled || !videoRef.current) return;
		videoRef.current.playbackRate = 2;
		videoRef.current.play().catch(() => {});
	};

	return (
		<video
			ref={videoRef}
			autoPlay={!controlled}
			muted
			loop
			playsInline
			preload="auto"
			onCanPlay={handleCanPlay}
			className={twMerge(
				"fixed inset-0 w-full h-full object-cover object-top -z-10 opacity-90 dark:opacity-50 -scale-x-100",
				className
			)}
		>
			<source src="/sky_compressed.mp4" type="video/mp4" />
		</video>
	);
});

export default BackgroundVideo;
