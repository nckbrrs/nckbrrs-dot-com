import { useMemo,  } from "react";
import styled from "styled-components";
import { Text } from './base'

const NounBubble: React.FC = () => {
    const names: string[] = useMemo(() => [
        'developer',
        'coffee lover',
        'creative',
        'musician',
        'photographer',
        'vocalist',
        'human'
    ], [])

    const interval = 4;

    const NounContainer = styled.div`
        z-index: 1;
        background-color: #0039a6;
        overflow: hidden;
        height: 3rem;
        border-radius: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: nounBubbleBackground ${interval * 10}s ease-in-out infinite;
        transition: 1.5s;
        width: ${names[0].length * 1.333}rem;
    `

    return (
        <NounContainer>
            <Text>{names[0]}</Text>
        </NounContainer>
    )
}

export default NounBubble;