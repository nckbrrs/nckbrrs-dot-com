import { HTMLMotionProps, motion } from "framer-motion";

interface HamburgerProps {
    state: 'open' | 'closed';
    onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({state, onClick}) => {
    return (
        <HamburgerContainer animate={state} onClick={onClick}>
            <HamburgerBar variants={hamburgerBarMotionVariants.top}/>
            <HamburgerBar variants={hamburgerBarMotionVariants.middle}/>
            <HamburgerBar variants={hamburgerBarMotionVariants.bottom}/>
        </HamburgerContainer>
    )
}

const HamburgerContainer = (props: HTMLMotionProps<"div">) => (
    <motion.div 
        animate={props.animate}
        onClick={props.onClick}
        className={`
            flex
            flex-col
            z-20
            h-full
            w-full
            justify-evenly`
        }
    >
        {props.children}
    </motion.div>
)

const HamburgerBar = (props: HTMLMotionProps<"div">) => (
    <motion.div
        variants={props.variants}
        className={`
            flex
            flex-row
            bg-black
            w-full
            dark:bg-bone
            h-[10%]
            h-${4} // TODO work on this
        `}
    >
        {props.children}
    </motion.div>
)

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