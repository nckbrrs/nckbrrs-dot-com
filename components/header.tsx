import Logo from './icons/Logo';
import { Col, Row } from './base';
import 'twin.macro';
import Link from 'next/link';
import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AnimatePresence } from 'framer-motion';
import ResumePdf from '../public/resume.pdf';

const Header: React.FC = () => {
    const [menuState, setMenuState] = useState<'open' | 'closed'>('closed');
    const sessionStorage = (typeof window !== 'undefined') ? window.sessionStorage : null;

    const toggleMenu = () => {
        setMenuState(menuState === 'closed' ? 'open' : 'closed');
    }

    const onClickLogo = () => {
        toggleMenu();
        if (sessionStorage) {
            sessionStorage.setItem('hasOpenedMenuAtLeastOnce', 'true')
        }
    }

    const AnimatedLogo: JSX.Element = (
        <LogoContainer
            animate={{
                rotate: ['0deg', '-8deg', '8deg', '-8deg', '8deg', '-8deg', '8deg', '0deg'],
                scale: [1, 1.333, 1]
            }}
            transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: 'easeInOut',
                delay: 1,
                repeatDelay: 4
            }}
            onClick={onClickLogo}
        >
            <LogoWrapper>
                <Logo/>
            </LogoWrapper>
        </LogoContainer>
    );

    const NonAnimatedLogo: JSX.Element = (
        <LogoContainer onClick={onClickLogo}>
            <LogoWrapper>
                <Logo/>
            </LogoWrapper>
        </LogoContainer>
    )

    const hasOpenedMenuAtLeastOnce: boolean = Boolean(sessionStorage?.getItem('hasOpenedMenuAtLeastOnce') || false);

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
            text: 'spotify',
            href: 'https://open.spotify.com/artist/6P5suR8XUGZzqYyX5WpsCY'
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
            {hasOpenedMenuAtLeastOnce ? <>{NonAnimatedLogo}</> : <>{AnimatedLogo}</>}
            <AnimatePresence>
                {menuState === 'open' && 
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

const LogoContainer = styled(Col)(() => [
    tw`
        z-20
        w-12 xl:w-16
        h-12 xl:h-16
        drop-shadow-sm
        cursor-pointer
        fill-black
        dark:fill-bone
    `
])

const LogoWrapper = styled.span(() => [
    tw`
        duration-100
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