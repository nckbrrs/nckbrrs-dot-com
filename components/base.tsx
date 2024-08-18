import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";

export const Row = styled(motion.div)(() => [
    tw`
        flex
        flex-row
    `
])

export const Col = styled(motion.div)(() => [
    tw`
        flex
        flex-col
    `
])

export const RowCentered = styled(Row)(() => [
    tw`
        justify-center
        items-center
    `
])

export const MotionRow = styled(motion.div)(() => [
    tw`
        flex
        flex-row
    `
])

export const MotionCol = styled(motion.div)(() => [
    tw`
        flex
        flex-col
    `
])