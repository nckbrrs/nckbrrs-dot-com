import Logo from './icons/Logo';
import { Col, Row } from './base';
import 'twin.macro';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <Col tw="pt-5 sm:pt-10 md:pt-12 lg:pt-20">
            <Row tw="justify-end items-center">
                <Col tw="w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 drop-shadow-sm">
                    <Link href="/">
                        <Logo/>
                    </Link>
                </Col>
            </Row>
        </Col>
    )
}

export default Header;


