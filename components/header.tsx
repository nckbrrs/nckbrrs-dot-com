import styled from 'styled-components';
import Logo from './icons/Logo';
import NounBubble from './nounBubble';
import { Row, Text } from './base';
import { RowVCentered } from './base';
import tw from 'twin.macro';

const Header: React.FC = () => {
    const HeaderContainer2 = styled(RowVCentered)(() => [
        tw`
            justify-between
        `
    ])
    
    return (
        <HeaderContainer2>
            <Text tw="text-6xl font-semibold tracking-tight">nick barrs</Text>
            <Row tw="w-24 h-24">
                <Logo/>
            </Row>
        </HeaderContainer2>
    )
}

export default Header;


