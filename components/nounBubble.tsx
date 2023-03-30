import { useMemo } from "react";
import { Row, RowCentered } from './base'
import { theme } from "twin.macro";

const NounBubble: React.FC = () => {
    const names: string[] = useMemo(() => [
        'developer',
        'creative',
        'musician',
        'photographer',
        'vocalist',
        'coffee snob',
        'human',
        'enneagram 9',
        'lego builder',
        'developer',
    ], []);
    
    const bgColors: string[] = useMemo(() => [
        theme('colors.cyan.400'),
        theme('colors.red.500'),
        theme('colors.orange.500'),
        theme('colors.green.500'),
        theme('colors.gray.500'),
        theme('colors.yellow.500'),
        theme('colors.blue.500'),
        theme('colors.teal.500'),
        theme('colors.purple.500'),
        theme('colors.red.500'),
        theme('colors.cyan.400')
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
                ease: 'anticipate',
                delay: 1
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
                    ease: 'anticipate',
                    delay: 1
                }}
            >
                {names.map((n) => <p key={n} tw="text-4xl font-bold text-bone w-64 text-center">{n}</p>)}
            </Row>
        </RowCentered>
    )
}

export default NounBubble;
