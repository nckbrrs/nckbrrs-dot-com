"use client"
import { ComponentProps, HTMLAttributes, useState } from 'react';
import ResumePDF from '../../public/resume.pdf'
import Hamburger from './Hamburger';
import { AnimatePresence, AnimatePresenceProps, HTMLMotionProps, motion } from 'framer-motion';
import Link from 'next/link';

const Header: React.FC = () => {
    const [hamburgerState, setHamburgerState] = useState<'open' | 'closed'>('closed');
    const onClickHamburger = () => {
        setHamburgerState(hamburgerState === 'closed' ? 'open' : 'closed');
    }

    if (typeof window !== 'undefined') {
        document.onkeydown = ((event) => {
            if (event.key === "Escape") {
                setHamburgerState('closed')
            }
        })
    }

    const links: {linkType: 'external' | 'local', text: string, href: string}[] = [
        {
            linkType: 'external',
            text: 'bluesky',
            href: ' https://bsky.app/profile/nckbrrs.bsky.social'
        },
        {
            linkType: 'external',
            text: 'threads',
            href: 'https://threads.net/@nckbrrs'
        },
        {
            linkType: 'external',
            text: 'instagram',
            href: 'https://www.instagram.com/nckbrrs'
        },
        {
            linkType: 'external',
            text: 'youtube',
            href: 'https://www.youtube.com/@nckbrrs'
        },
        {
            linkType: 'external',
            text: 'github',
            href: 'https://www.github.com/nckbrrs'
        },
        {
            linkType: 'external',
            text: 'linkedin',
            href: 'https://www.linkedin.com/in/nckbrrs'
        },
        {
            linkType: 'external',
            text: 'resume',
            href: ResumePDF
        },
        {
            linkType: 'external',
            text: 'email',
            href: 'mailto:hello@nickbarrs.com'
        },
    ]

    return (
        <Container>
            <HamburgerContainer onClick={onClickHamburger}>
                <Hamburger state={hamburgerState} onClick={onClickHamburger}/>
            </HamburgerContainer>
            <AnimatePresence>
                {hamburgerState === 'open' && 
                    <FullScreenMenuContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <MenuLinksCol>
                            {links.map((l) => 
                                l.linkType === 'external' ? (
                                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                                        <LinkText>{l.text.toUpperCase()}</LinkText>
                                    </a>
                                ) : (
                                    <Link href={`${l.href}`} >
                                        <LinkText>{l.text.toUpperCase()}</LinkText>
                                    </Link>
                                )
                            )}
                        </MenuLinksCol>
                    </FullScreenMenuContainer>
                }
            </AnimatePresence>
        </Container>
    )
}

const Container = (props: {children: React.ReactNode}) => (
    <div
        className={`
            w-full
            flex
            flex-row
            justify-end
            items-center
            pt-6 sm:pt-10 md:pt-12 lg:pt-20
            overflow-hidden
        `}
    >
        {props.children}
    </div>
)

const HamburgerContainer = (props: {children: React.ReactNode}  & {onClick: () => void}) => (
    <div
        onClick={props.onClick}
        className={`
            flex
            flex-col
            z-20
            w-10
            h-10
            cursor-pointer
            dark:fill-bone
            duration-75
            hover:scale-110
        `}
    >
        {props.children}
</div>
)

const FullScreenMenuContainer = (props: HTMLMotionProps<"div">) => (
    <motion.div 
        initial={props.initial}
        animate={props.animate}
        exit={props.exit}
        className={`
            flex flex-row 
            w-full 
            h-full 
            space-y-2 
            bg-bone dark:bg-black 
            left-0 
            top-0 
            z-10 
            absolute 
            justify-center 
            items-center`
        }
    >
        {props.children}
    </motion.div >
)

const MenuLinksCol = (props: {children: React.ReactNode}) => (
    <div 
        className={`
            flex
            flex-col
            flex-wrap
            group
            items-start
            justify-center
            space-y-0 lg:space-y-1
            translate-y-2`
        }
    >
        {props.children}
    </div>
)

const LinkText = (props: {children: React.ReactNode}) => (
    <p 
        className={`
            w-full
            px-2
            text-4xl md:text-5xl lg:text-7xl
            font-bold
            italic 
            text-left
            duration-200
            group-hover:opacity-25
            group-hover:blur-[2px]
            hover:!opacity-100
            hover:!blur-0
            hover:translate-x-3`
        }
    >
        {props.children}
    </p>
)

export default Header;