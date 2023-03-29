import { Col, Row } from './base';
import ResumePdf from '../public/resume.pdf';
import 'twin.macro'

const Footer: React.FC = () => {
    return (
        <Col tw="z-20 pb-5 sm:pb-10 md:pb-12 lg:pb-20">
            <Row tw="justify-between items-center">
                <a href={ResumePdf} target="_blank" rel="noopener noreferrer">
                    <p tw="tracking-tightish font-mono font-normal lg:text-xl hover:font-semibold hover:drop-shadow-sm hover:-translate-y-[1px] duration-100 cursor-pointer">resume</p>
                </a>
                <a href="mailto:hello@nickbarrs.com">
                    <p tw="tracking-tightish font-mono font-normal lg:text-xl hover:font-semibold hover:drop-shadow-sm hover:-translate-y-[1px] duration-100 cursor-pointer">contact</p>
                </a>
            </Row>
        </Col>
    )
}

export default Footer;


