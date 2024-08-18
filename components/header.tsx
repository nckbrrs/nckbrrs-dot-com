import { Col, Row } from './base';
import 'twin.macro';
import Link from 'next/link';
import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AnimatePresence } from 'framer-motion';
import ResumePdf from '../public/resume.pdf';
import Hamburger from './hamburger';

const Header: React.FC = () => {
    const [hamburgerState, setHamburgerState] = useState<'open' | 'closed'>('closed');
    const onClickHamburger = () => {
        setHamburgerState(hamburgerState === 'closed' ? 'open' : 'closed');
    }

    const links: {linkType: 'external' | 'local', text: string, href: string}[] = [
        {
            linkType: 'external',
            text: 'apple music',
            href: 'https://music.apple.com/profile/nckbrrs'
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
            href: ResumePdf
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
                    <MenuContainer 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <MenuLinksCol className="group">
                            {links.map((l) => 
                                l.linkType === 'external' ? (
                                    <a tw="w-full" href={l.href} target="_blank" rel="noopener noreferrer">
                                        <LinkText>{l.text.toUpperCase()}</LinkText>
                                    </a>
                                ) : (
                                    <Link tw="w-full" href={`${l.href}`} >
                                        <LinkText>{l.text.toUpperCase()}</LinkText>
                                    </Link>
                                )
                            )}
                        </MenuLinksCol>
                    </MenuContainer>
                }
            </AnimatePresence>
        </Container>
    )
}

export default Header;

const MenuLinksCol = styled(Col)(() => [
    tw`
        flex-wrap
        items-center
        justify-center
        space-y-0 lg:space-y-1
        translate-y-2
    `
])

const Container = styled(Row)(() => [
    tw`
        justify-end
        items-center
        pt-6 sm:pt-10 md:pt-12 lg:pt-20
    `
])

const HamburgerContainer = styled(Col)(() => [
    tw`
        z-20
        w-10
        h-10
        cursor-pointer
        dark:fill-bone
        duration-75
        hover:scale-110
    `
])

const LinkText = styled.p(() => [
    tw`
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
])

const MenuContainer = styled(Row)(() => [
    tw`
        w-screen
        h-screen
        space-y-2
        bg-bone
        dark:bg-black
        left-0
        top-0
        z-10
        absolute
        justify-center
        items-center
    `
])