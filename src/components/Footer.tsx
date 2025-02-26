import GitHub from "./icons/GitHub";
import Link from "next/link";

export default function Footer() {
	return (
		<div className={containerStyling}>
			<Link
				href="https://www.github.com/nckbrrs"
				target={"_blank"}
				rel={"noopener noreferrer"}
			>
				<GitHub className={githubIconStyling} />
			</Link>
		</div>
	);
}

const containerStyling = `
	flex
	flex-row
	justify-end
	items-start
	w-full
	h-20 md:h-24
	px-6 md:px-16
`;

const githubIconStyling = `
	w-10
	fill-black dark:fill-bone
`;
