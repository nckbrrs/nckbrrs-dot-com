import { ReactNode } from "react";
import Header from "./header";
import styled from "styled-components";
import Footer from "./footer";
import { Col, ColHCentered } from "./base";
import tw from "twin.macro";

const Layout: React.FC<{children: ReactNode}> = ({children}) => {
    const LayoutContainer2 = styled(ColHCentered)(() => [
        tw`
            justify-between
            w-screen
            h-screen
            max-w-screen-2xl
            px-32
            border-2
            border-black
        `
    ])

    const LayoutHeader2 = styled(Col)(() => [
        tw`
            w-full
            py-24
            border-2
            border-blue-500
        `
    ])

    const LayoutFooter2 = styled(Col)(() => [
        tw`
            w-full
            py-24
            border-2
            border-purple-500
        `
    ])

    return (
        <LayoutContainer2>
            <LayoutHeader2>
                <Header/>
            </LayoutHeader2>
            {children}
            <LayoutFooter2>
                <Footer/>
            </LayoutFooter2>
        </LayoutContainer2>
    )
    
}

export default Layout;

