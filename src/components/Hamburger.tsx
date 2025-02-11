import { motion } from "framer-motion";

interface HamburgerProps {
	isOpen: boolean;
	onClick: () => void;
}

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
	const hamburgerBarMotionVariants = {
		top: {
			closed: {},
			open: {
				rotate: 45,
				translateY: `${((100 - 3 * 10) / 4 + 10) * 10}%`,
				scale: 0.75
			}
		},
		middle: {
			closed: {},
			open: {
				translateX: 100,
				opacity: 0
			}
		},
		bottom: {
			closed: {},
			open: {
				rotate: -45,
				translateY: `-${((100 - 3 * 10) / 4 + 10) * 10}%`,
				scale: 0.75
			}
		}
	};

	return (
		<motion.div
			className={hamburgerStyling}
			animate={isOpen ? "open" : "closed"}
			onClick={onClick}
		>
			<motion.div
				className={hamburgerBarStylingBase}
				variants={hamburgerBarMotionVariants.top}
			/>
			<motion.div
				className={hamburgerBarStylingBase}
				variants={hamburgerBarMotionVariants.middle}
			/>
			<motion.div
				className={hamburgerBarStylingBase}
				variants={hamburgerBarMotionVariants.bottom}
			/>
		</motion.div>
	);
}

const hamburgerStyling = `
    flex
    flex-col
    h-full
    w-full
    justify-evenly
    bg-transparent
	rounded-xl
    p-0
	hover:scale-105
	duration-200
`;

const hamburgerBarStylingBase = `
    hamburgerBar
    flex
    flex-row
    h-[10%]
	bg-black dark:bg-bone
`;
