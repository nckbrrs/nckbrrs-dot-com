import { twMerge } from "tailwind-merge";

interface MobileEdgeFadesProps {
	className?: string;
}

const VERTICAL = "[background:linear-gradient(to_bottom,#005AFD_0%,transparent_18%,transparent_82%,#005AFD_100%)]";
const HORIZONTAL = "[background:linear-gradient(to_right,#005AFD_0%,transparent_6%,transparent_94%,#005AFD_100%)]";

export default function MobileEdgeFades({ className }: MobileEdgeFadesProps) {
	return (
		<>
			<div className={twMerge("pointer-events-none lg:hidden", VERTICAL, className)} />
			<div className={twMerge("pointer-events-none hidden sm:block lg:hidden", HORIZONTAL, className)} />
		</>
	);
}
