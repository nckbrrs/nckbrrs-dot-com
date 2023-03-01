import styled from 'styled-components';
import tw, { theme } from 'twin.macro';
import ArrowIcon from './icons/Arrow';
import { Row, RowCentered, RowVCentered } from './base';
import AppleMusicIcon from './icons/AppleMusic';
import SpotifyIcon from './icons/Spotify';
import GitHubIcon from './icons/GitHub';
import TwitterIcon from './icons/Twitter';
import YoutubeIcon from './icons/YouTube';
import InstagramIcon from './icons/Instagram';
import LinkedInIcon from './icons/LinkedIn';

const Footer: React.FC = () => {
    const FooterContainer = styled(RowVCentered)(() => [
        tw`
            w-full
            justify-between
        `
    ]);

    const IconContainer = styled(RowCentered)<{padded?: boolean}>(({padded}) => [
        tw`
            w-12
            h-12
            rounded-full
            fill-primary
        `,
        padded && tw`p-3`
    ]);

    const iconsForRow = [<AppleMusicIcon/>, <SpotifyIcon/>, <GitHubIcon/>, <TwitterIcon/>, <YoutubeIcon/>, <InstagramIcon/>, <LinkedInIcon/>];

    return (
        <FooterContainer>
            <Row>
                {iconsForRow.map((i) => (
                    <IconContainer padded>
                        {i}
                    </IconContainer>
                ))}
            </Row>
            <IconContainer>
                <ArrowIcon/>
            </IconContainer>
        </FooterContainer>
    )
}

export default Footer;


