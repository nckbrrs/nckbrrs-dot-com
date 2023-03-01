import { StyledComponent } from "styled-components";
import tw, { styled } from "twin.macro";

export const Row = styled.div(() => [
    tw`
        flex
        flex-row
    `
])

export const Col = styled.div(() => [
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

export const ColCentered = styled(Col)(() => [
    tw`
        justify-center
        items-center
    `
])

export const RowHCentered = styled(Row)(() => [
    tw`
        justify-center
    `
])

export const RowVCentered = styled(Row)(() => [
    tw`
        items-center
    `
])

export const ColHCentered = styled(Col)(() => [
    tw`
        items-center
    `
])

export const ColVCentered = styled(Col)(() => [
    tw`
        justify-center
    `
])

export const Text = styled.p(() => [
    tw`
        font-primary
        text-base
        font-normal
        text-primary
    `
])