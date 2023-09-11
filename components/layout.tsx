import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { Col, Row } from "./base";
import "twin.macro";

const Layout: React.FC<{children: ReactNode}> = ({children}) => {
    return (
        <Row tw="min-h-screen justify-center">
            <Col tw="w-screen max-w-[2000px] justify-between px-5 md:px-16 duration-500">
                <Header/>
                <Col tw="h-full justify-start">
                    {children}
                </Col>
                <Footer/>
            </Col>
        </Row>
    )
    
}

export default Layout;

