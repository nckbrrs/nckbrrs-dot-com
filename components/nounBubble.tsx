import { useMemo } from "react";
import { Row, RowCentered } from './base'
import tw, { styled, theme } from "twin.macro";

const NounBubble: React.FC<{nouns: string[]}> = ({nouns}) => {    
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
        <Container
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
                    translateX: nouns.map((n, i) => `-${i*16}rem`)
                }}
                transition={{
                    repeat: Infinity,
                    duration: (nouns.length - 1) * animationIntervalInSeconds,
                    ease: 'anticipate',
                    delay: 1
                }}
            >
                {nouns.map((n) => <Noun key={n}>{n}</Noun>)}
            </Row>
        </Container>
    )
}

const Container = styled(RowCentered)(() => [
    tw`
        z-10
        h-16
        w-64
        overflow-hidden
        rounded-full
        relative
        shadow-inner
    `
])

const Noun = styled.p(() => [
    tw`
        text-4xl
        font-bold
        text-bone
        w-64
        text-center
        drop-shadow-sm
    `
])

export default NounBubble;
