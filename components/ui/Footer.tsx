const Footer: React.FC = () => (
    <div className={containerStyling()}>
        <p className={footerTextStyling()}>
            made with&nbsp;❤️&nbsp;by me
        </p>
    </div>
)

const containerStyling = () => `
    flex
    flex-col
    w-full
    pb-4 sm:pb-10 md:pb-12 lg:pb-20
    pt-6 
    justify-end
    items-end
`

const footerTextStyling = () => `
    text-[0.75em]
    opacity-20
    tracking-wider
`

export default Footer;