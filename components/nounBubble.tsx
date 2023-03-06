import { useMemo } from "react";
import { Row, RowCentered, TextPrimary } from './base'
import { theme } from "twin.macro";

const NounBubble: React.FC = () => {
    const names: string[] = useMemo(() => [
        'developer',
        'coffee lover',
        'creative',
        'musician',
        'photographer',
        'vocalist',
        'human',
        'developer',
    ], []);
    
    const bgColors: string[] = useMemo(() => [
        theme('colors.mtaRed').toString(), 
        theme('colors.mtaOrange').toString(), 
        theme('colors.mtaGreen').toString(), 
        theme('colors.mtaGray').toString(), 
        theme('colors.mtaYellow').toString(), 
        theme('colors.mtaBlue').toString(), 
        theme('colors.mtaBrown').toString(), 
        theme('colors.mtaPurple').toString(), 
        theme('colors.mtaRed').toString(),
    ], []);

    const animationIntervalInSeconds = 2.5;

    return (
        <RowCentered tw="z-10 h-16 w-64 overflow-hidden rounded-full relative shadow-sm"
            initial={{
                backgroundColor: bgColors[0]
            }}
            animate={{
                background: bgColors
            }}
            transition={{
                repeat: Infinity,
                duration: (bgColors.length - 1) * animationIntervalInSeconds,
                ease: 'anticipate'
            }}
        >
            <Row tw="h-10 absolute left-0 flex-nowrap"
                initial={{
                    translateX: 0
                }}
                animate={{
                    translateX: names.map((n, i) => `-${i*16}rem`)
                }}
                transition={{
                    repeat: Infinity,
                    duration: (names.length - 1) * animationIntervalInSeconds,
                    ease: 'anticipate'
                }}
            >
                {names.map((n) => <TextPrimary key={n} tw="text-4xl font-bold text-background w-64 text-center">{n}</TextPrimary>)}
            </Row>
        </RowCentered>
    )
}

export default NounBubble;
