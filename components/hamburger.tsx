import tw, { styled } from "twin.macro";
import { Col, MotionCol, MotionRow, Row } from "./base";
import 'twin.macro';

interface HamburgerProps {
    state: 'open' | 'closed';
    onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({state, onClick}) => {
    console.log(state=="open");
    return (
        <Container animate={state} onClick={onClick}>
            <HamburgerBar variants={hamburgerBarMotionVariants.top}/>
            <HamburgerBar variants={hamburgerBarMotionVariants.middle}/>
            <HamburgerBar variants={hamburgerBarMotionVariants.bottom}/>
        </Container>
    )
}

const Container = styled(MotionCol)(() => [
    tw`
       z-20
       h-full
       justify-evenly
    `
])

const hamburgerBarHeight = 4;
const hamburgerBarHeightPx = `${hamburgerBarHeight}px`

const HamburgerBar = styled(MotionRow)`
    ${tw`rounded-sm h-[${hamburgerBarHeightPx}] bg-black`}
`

const hamburgerBarMotionVariants = {
    top: {
        closed: {},
        open: {
            rotate: 45,
            translateY: 11.111,
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
            translateY: -11.111,
            scale: -0.75
        }
    }
}

export default Hamburger;