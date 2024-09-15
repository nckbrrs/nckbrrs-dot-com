"use client"

import { HTMLMotionProps, motion } from "framer-motion";
import { useMemo } from "react";
import tailwindConfig from "@/tailwind.config";
import resolveConfig from 'tailwindcss/resolveConfig'

const NounBubble: React.FC<{nouns: {text: string; width: number; }[]}> = ({nouns}) => {
    const twConfig = resolveConfig(tailwindConfig)

    const bgColors: string[] = useMemo(() => [
        twConfig.theme.colors.cyan[400],
        twConfig.theme.colors.red[500],
        twConfig.theme.colors.orange[500],
        twConfig.theme.colors.green[500],
        twConfig.theme.colors.gray[500],
        twConfig.theme.colors.yellow[500],
        twConfig.theme.colors.blue[500],
        twConfig.theme.colors.teal[500],
        twConfig.theme.colors.purple[500],
        twConfig.theme.colors.red[500],
        twConfig.theme.colors.cyan[400]
    ], []);

    const animationIntervalInSeconds = 2.5;
    const animationEase = 'anticipate';

    const translateLeftDistances: number[] = []
    nouns.forEach((n, i) => {
        if (i == 0) {
            translateLeftDistances.push(-3)
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
                    ease: animationEase,
                    delay: 1
                },
                default: {
                    repeat: Infinity,
                    duration: (nouns.length - 1) * animationIntervalInSeconds,
                    ease: animationEase,
                    delay: 1
                }
            }}
        >
            <Bubble
                initial={{
                    translateX: `${translateLeftDistances[0]}rem`
                }}
                animate={{
                    translateX: translateLeftDistances.map((d) => `${d}rem`)
                }}
                transition={{
                    repeat: Infinity,
                    duration: (nouns.length - 1) * animationIntervalInSeconds,
                    ease: animationEase,
                    delay: 1
                }}
            >
                {nouns.map((n, i) => <Noun key={i + "-" + n.text}>{n.text}</Noun>)}
            </Bubble>
        </Container>
    )
}

const Container = (props: HTMLMotionProps<"div">) => (
    <motion.div
        initial={props.initial}
        animate={props.animate}
        transition={props.transition}
        className={`
            flex
            flex-row
            justify-center
            items-center
            z-10
            h-14
            overflow-hidden
            rounded-full
            relative
        `}
    >
        {props.children}
    </motion.div>
)

const Bubble = (props: HTMLMotionProps<"div">) => (
    <motion.div
        initial={props.initial}
        animate={props.animate}
        transition={props.transition}
        className={`
            flex
            flex-row
            flex-nowrap
            h-10
            absolute
            left-0
        `}
    >
        {props.children}
    </motion.div>
)

const Noun = (props: {children: React.ReactNode}) => (
    <p 
        className={`
            pt-0.5 lg:pt-0
            text-[2rem] lg:text-4xl
            font-bold
            text-bone
            w-64
            text-center
            drop-shadow-sm
        `}
    >
        {props.children}
    </p>
)

export default NounBubble;