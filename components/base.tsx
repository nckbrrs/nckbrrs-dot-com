import { motion } from "framer-motion";
import { StyledComponent } from "styled-components";
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

export const TextPrimary = styled.p(() => [
    tw`
        font-primary
        text-base
        font-normal
        text-primary
    `
])