"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
	const [wiggling, setWiggling] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!wiggling) {
			setWiggling(true);
			setTimeout(() => setWiggling(false), 600);
		}
	};

	return (
		<div className={containerStyling}>
			<Link
				href="mailto:hello@nickbarrs.com"
				className={"flex justify-center items-center w-10"}
				onClick={handleClick}
			>
				<p className={`text-4xl origin-bottom-right ${wiggling ? "animate-wiggle" : ""}`}>
					👋
				</p>
			</Link>
		</div>
	);
}

const containerStyling = `
	flex
	flex-row
	justify-end
	items-end
	w-full
	px-6 md:px-16
	pb-8 sm:pb-16 md:pb-20
`;
