import { HTMLMotionProps, motion } from "framer-motion";

interface HamburgerProps {
    state: 'open' | 'closed';
    onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({state, onClick}) => {
    return (
        <motion.div className={hamburgerContainerStyling()} animate={state} onClick={onClick}>
            <motion.div className={hamburgerBarStyling()} variants={hamburgerBarMotionVariants.top}/>
            <motion.div className={hamburgerBarStyling()} variants={hamburgerBarMotionVariants.middle}/>
            <motion.div className={hamburgerBarStyling()} variants={hamburgerBarMotionVariants.bottom}/>
        </motion.div>
    )
}

const hamburgerContainerStyling = () => `
    flex
    flex-col
    z-20
    h-full
    w-full
    justify-evenly
`
const hamburgerBarStyling = () => `
    flex
    flex-row
    bg-black
    w-full
    dark:bg-bone
    h-[10%]
`

const hamburgerBarMotionVariants = {
    top: {
        closed: {},
        open: {
            rotate: 45,
            translateY: `${(((100 - (3*10))/4)+10)*10}%`,
            scale: -0.75
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
            translateY: `-${(((100 - (3*10))/4)+10)*10}%`,
            scale: -0.75
        }
    }
}

export default Hamburger;