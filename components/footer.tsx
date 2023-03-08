import styled from 'styled-components';
import tw, { theme } from 'twin.macro';
import ArrowIcon from './icons/Arrow';
import { Col, Row, RowCentered } from './base';
import AppleMusicIcon from './icons/AppleMusic';
import SpotifyIcon from './icons/Spotify';
import GitHubIcon from './icons/GitHub';
import TwitterIcon from './icons/Twitter';
import YoutubeIcon from './icons/YouTube';
import InstagramIcon from './icons/Instagram';
import LinkedInIcon from './icons/LinkedIn';
import EmailIcon from './icons/Email';
import { useState } from 'react';

const IconContainer = styled(RowCentered)(() => [
    tw`
        w-10
        h-10
        p-2.5
        rounded-full
        fill-background
        bg-primary
        duration-200
        group-hover:opacity-25
        hover:!opacity-100
        hover:!blur-0
        hover:-translate-y-1 
        hover:cursor-pointer
    `
]);

const Footer: React.FC = () => {
    const stuffIcons = [
        <AppleMusicIcon/>,
        <SpotifyIcon/>,
        <TwitterIcon/>,
        <InstagramIcon/>,
        <YoutubeIcon/>,
        <GitHubIcon/>,
    ];

    const contactIcons = [
        <LinkedInIcon/>,
        <EmailIcon/>
    ]

    return (
        <Col tw="pt-10 pb-4 sm:py-20">
            <Row tw="justify-end items-center">
                <a href="mailto:nick@nickbarrs.com">
                    <p tw="tracking-tightish font-mono font-normal sm:text-xl hover:font-semibold hover:drop-shadow-sm hover:-translate-y-[1px] duration-100 cursor-pointer">contact</p>
                </a>
            </Row>
        </Col>
    )
}

export default Footer;


