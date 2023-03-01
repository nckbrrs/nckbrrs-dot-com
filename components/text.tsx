import styled from "styled-components";

interface TextProps {
    fontSize?: string;
    fontWeight?: number | string;
    color?: string;
}

export const HelveticaNeue = styled.p<TextProps>`
    font-family: var(--primary-font-family);
    font-size: ${props => props.fontSize || '1rem'};
    font-weight: ${props => props.fontWeight || 'regular'};
    color: ${props => props.color || `var(--primary-color)`};
`