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
        <div className={containerStyling()}>
            <div className={hamburgerContainerStyling()} onClick={onClickHamburger}>
                <Hamburger state={hamburgerState} onClick={onClickHamburger}/>
            </div>
            <motion.div>
                {hamburgerState === 'open' && 
                    <motion.div className={fullScreenMenuContainerStyling()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={menuLinksColStyling()}>
                            {links.map((l) => 
                                l.linkType === 'external' ? (
                                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                                        <p className={linkTextStyling()}>{l.text.toUpperCase()}</p>
                                    </a>
                                ) : (
                                    <Link href={`${l.href}`} >
                                        <p className={linkTextStyling()}>{l.text.toUpperCase()}</p>
                                    </Link>
                                )
                            )}
                        </div>
                    </motion.div>
                }
            </motion.div>
        </div>
    )
}

const containerStyling = () => `
    w-full
    flex
    flex-row
    justify-end
    items-center
    pt-6 sm:pt-10 md:pt-12 lg:pt-20
    overflow-hidden
`

const hamburgerContainerStyling = () => `
    flex
    flex-col
    z-20
    w-10
    h-10
    cursor-pointer
    dark:fill-bone
    duration-75
    hover:scale-110
`

const fullScreenMenuContainerStyling = () => `
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
    items-center
`

const menuLinksColStyling = () => `
    flex
    flex-col
    flex-wrap
    group
    items-start
    justify-center
    space-y-0 lg:space-y-1
    translate-y-2 
`
 
const linkTextStyling = () => `
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
    hover:translate-x-3
`

export default Header;