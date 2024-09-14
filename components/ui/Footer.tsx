const Footer: React.FC = () => (
    <Container>
        <FooterText>
            made with&nbsp;❤️&nbsp;by me
        </FooterText>
    </Container>
)

const Container = (props: {children: React.ReactNode}) => (
    <div
        className={`
            flex
            flex-col
            w-full
            pb-4 sm:pb-10 md:pb-12 lg:pb-20
            pt-6 
            justify-end
            items-end
        `}
    >
        {props.children}
    </div>
)

const FooterText = (props: {children: React.ReactNode}) => (
    <p
        className={`
            text-[0.75em]
            opacity-75
        `}
    >
        {props.children}
    </p>
)

export default Footer;