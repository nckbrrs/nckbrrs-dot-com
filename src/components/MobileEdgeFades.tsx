import { twMerge } from "tailwind-merge";

interface MobileEdgeFadesProps {
	className?: string;
}

const VERTICAL_FULL = "[background:linear-gradient(to_bottom,var(--bg-fade)_0%,transparent_18%,transparent_82%,var(--bg-fade)_100%)]";
const VERTICAL_TOP  = "[background:linear-gradient(to_bottom,var(--bg-fade)_0%,transparent_18%)]";
const HORIZONTAL    = "[background:linear-gradient(to_right,var(--bg-fade)_0%,transparent_6%,transparent_94%,var(--bg-fade)_100%)]";

export default function MobileEdgeFades({ className }: MobileEdgeFadesProps) {
	return (
		<>
			{/* Smallest screens: top + bottom fade */}
			<div className={twMerge("pointer-events-none sm:hidden", VERTICAL_FULL, className)} />
			{/* sm–lg: top fade only (horizontal handles sides, no bottom) */}
			<div className={twMerge("pointer-events-none hidden sm:block", VERTICAL_TOP, className)} />
			{/* sm–lg: left + right fade */}
			<div className={twMerge("pointer-events-none hidden sm:block lg:hidden", HORIZONTAL, className)} />
		</>
	);
}
