"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
	const pathname = usePathname();
	const [wiggling, setWiggling] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		if (pathname === "/contact") {
			e.preventDefault();
			if (!wiggling) {
				setWiggling(true);
				setTimeout(() => setWiggling(false), 600);
			}
		}
	};

	return (
		<div className={containerStyling}>
			<Link
				href="/contact"
				className={"flex justify-center items-center w-10"}
				onClick={handleClick}
			>
				<p className={`text-4xl ${wiggling ? "animate-wiggle" : ""}`}>
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
	pb-4 sm:pb-16 md:pb-20
`;
