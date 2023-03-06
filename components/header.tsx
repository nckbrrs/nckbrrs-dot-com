import Logo from './icons/Logo';
import { Col, Row, TextPrimary } from './base';
import 'twin.macro';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <Row tw="justify-between items-center pt-8 pb-4 sm:py-20">
            <Col tw="drop-shadow-sm opacity-0">
                <Link href="/">
                    <TextPrimary tw="text-4xl sm:text-6xl font-semibold tracking-tightish">nick barrs</TextPrimary>
                </Link>
            </Col>
            <Col tw="w-10 h-10 sm:w-16 sm:h-16 drop-shadow-sm">
                <Link href="/">
                    <Logo/>
                </Link>
            </Col>
        </Row>
    )
}

export default Header;


