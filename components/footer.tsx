import { Col } from './base';
import 'twin.macro'

const Footer: React.FC = () => {
    return (
        <Col tw="pb-4 pt-6 sm:pb-10 md:pb-12 lg:pb-20 justify-end items-end">
            <p tw="text-[0.75em] font-mono tracking-tightest">made with ❤️ by me</p>
        </Col>
    )
}

export default Footer;


