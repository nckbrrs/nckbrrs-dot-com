import { useMemo } from "react";
import { Row, RowCentered } from './base'
import tw, { styled, theme } from "twin.macro";

const NounBubble: React.FC<{nouns: {text: string; width: number; }[]}> = ({nouns}) => {    
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

    const translateLeftDistances: number[] = []
    nouns.forEach((n, i) => {
        if (i == 0) {
            translateLeftDistances.push(0)
        } else {
            const diffFromBefore = nouns[i].width - nouns[i-1].width
            translateLeftDistances.push(translateLeftDistances[i-1] - (16-(diffFromBefore/2)))
        }
    })

    return (
        <Container
            initial={{
                backgroundColor: bgColors[0],
                width: `${nouns[0].width}rem`
            }}
            animate={{
                background: bgColors,
                width: nouns.map((x) => `${x.width}rem`),
            }}
            transition={{
                background: {
                    repeat: Infinity,
                    duration: (bgColors.length - 1) * animationIntervalInSeconds,
                    ease: 'anticipate',
                    delay: 1
                },
                default: {
                    repeat: Infinity,
                    duration: (nouns.length - 1) * animationIntervalInSeconds,
                    ease: 'anticipate',
                    delay: 1
                }
            }}
        >
            <Row tw="h-10 absolute left-0 flex-nowrap"
                initial={{
                    translateX: 0
                }}
                animate={{
                    translateX: translateLeftDistances.map((d) => `${d}rem`)
                }}
                transition={{
                    repeat: Infinity,
                    duration: (nouns.length - 1) * animationIntervalInSeconds,
                    ease: 'anticipate',
                    delay: 1
                }}
            >
                {nouns.map((n) => <Noun key={n.text}>{n.text}</Noun>)}
            </Row>
        </Container>
    )
}

const Container = styled(RowCentered)(() => [
    tw`
        z-10
        h-14
        overflow-hidden
        rounded-full
        relative
        shadow-inner
    `
])

const Noun = styled.p(() => [
    tw`
        pt-0.5 lg:pt-0
        text-[2rem] lg:text-4xl
        font-bold
        text-bone
        w-64
        text-center
        drop-shadow-sm
    `
])

export default NounBubble;
