import TwitterIcon from '../assets/icons/Twitter';
import AppleMusicIcon from '../assets/icons/AppleMusic';
import EmailIcon from '../assets/icons/Email';
import GithubIcon from '../assets/icons/GitHub';
import InstagramIcon from '../assets/icons/Instagram';
import LinkedinIcon from '../assets/icons/Linkedin';
import SpotifyIcon from '../assets/icons/Spotify';
import YoutubeIcon from '../assets/icons/Youtube';
import ResumeIcon from '../assets/icons/Resume';
import ResumePDF from '../assets/images/resume.pdf';

export const contentConfig = {
    home: {
        headerText: "nick barrs",
        mainText: "i'm a software developer and musician living and working in New York City.",
        socialLinks: [
            { 
                "name": "appleMusic",
                "text": "MUSIC",
                "href": "https://music.apple.com/us/artist/nick-barrs/1539845933",
                "icon": <AppleMusicIcon/>
            },
            {
                "name": "spotify",
                "text": "SPOTIFY",
                "href": "https://open.spotify.com/artist/2ZXVOSBi1E69IxiGuX8ofU?si=cSD9lEXoTRyGvoWBxbHGWA",
                "icon": <SpotifyIcon/>
            },
            {
                "name": "youtube",
                "text": "YOUTUBE",
                "href": "https://www.youtube.com/channel/UC4PnMvHxARiaOhzw-99Q4JA",
                "icon": <YoutubeIcon/>
            },
            {
                "name": "twitter",
                "text": "TWITTER",
                "href": "https://www.twitter.com/nckbrrs",
                "icon": <TwitterIcon/>
            },
            {
                "name": "instagram",
                "text": "INSTAGRAM",
                "href": "https://www.instagram.com/nckbrrs",
                "icon": <InstagramIcon/>
            },
            {
                "name": "github",
                "text": "GITHUB",
                "href": "https://www.github.com/nckbrrs",
                "icon": <GithubIcon/>
            },
            {
                "name": "linkedin",
                "text": "LINKEDIN",
                "href": "https://www.linkedin.com/in/nckbrrs",
                "icon": <LinkedinIcon/>
            },
            {
                "name": "resume",
                "text": "RESUME",
                "href": ResumePDF,
                "icon": <ResumeIcon/>
            },
            {
                "name": "email",
                "text": "CONTACT",
                "href": "mailto:nckbrrs@icloud.com",
                "icon": <EmailIcon/>
            }
        ]
    }
}
