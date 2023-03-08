import Logo from './icons/Logo';
import { Col, Row } from './base';
import 'twin.macro';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <Col tw="pt-10 pb-4 sm:py-20">
            <Row tw="justify-end items-center">
                <Col tw="w-10 h-10 sm:w-16 sm:h-16 drop-shadow-sm">
                    <Link href="/">
                        <Logo/>
                    </Link>
                </Col>
            </Row>
        </Col>
    )
}

export default Header;


