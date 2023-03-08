import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";

export const Row = styled(motion.div)(() => [
    tw`
        flex
        flex-row
        flex-wrap
    `
])

export const Col = styled(motion.div)(() => [
    tw`
        flex
        flex-col
        flex-wrap
    `
])

export const RowCentered = styled(Row)(() => [
    tw`
        justify-center
        items-center
    `
])