import Head from 'next/head'
import { Col, Row } from '../components/base';
import 'twin.macro';
import NounBubble from '../components/nounBubble';
import tw, { styled } from 'twin.macro';

const Home: React.FC<{users: any}> = ({ users }) => (
  <>
    <Head>
      <title>Nick Barrs / Home</title>
    </Head>
    <Col tw="items-start justify-center h-full">
      <NameRow>
        <NameText>
          nick <span tw="tracking-tight">barrs</span>
        </NameText>
      </NameRow>
      <DescriptionContainer>
        <IsANounContainer>
          <IsAText>
            is a 
          </IsAText>
          <NounBubbleContainer>
            <NounBubble/>
          </NounBubbleContainer>
        </IsANounContainer>
        <LivingWorkingText>
          living and working in New York City.
        </LivingWorkingText>
      </DescriptionContainer>
    </Col>
  </>
)

const NameRow = styled(Row)(() => [
  tw`
    pb-3 lg:pb-4
  `
])

const NameText = styled.p(() => [
  tw`
    -translate-x-2
    font-medium tracking-tighter
    leading-[7rem] lg:leading-[10rem]
    text-[8rem] lg:text-[12rem] 
    w-1/2 md:w-full
  `
])

const DescriptionContainer = styled(Col)(() => [
  tw`
    items-start lg:items-center
    tracking-tight 
    lg:flex-row
    text-3xl lg:text-4xl
    max-w-xs lg:max-w-full
  `
])

const IsANounContainer = styled(Row)(() => [
  tw`
    w-fit
    items-center
  `
])

const IsAText = styled.p(() => [
  tw`
    font-medium
    whitespace-nowrap
  `
])

const NounBubbleContainer = styled.span(() => [
  tw`
    scale-[0.8] lg:scale-100
    -translate-x-3 lg:translate-x-0
    lg:px-3
  `
])

const LivingWorkingText = styled.p(() => [
  tw`
    font-medium
    leading-[3rem] lg:leading-[4rem]
    -translate-y-2 lg:translate-y-0 
    lg:whitespace-nowrap
  `
])

export default Home