import Head from 'next/head'
import { Col, Row } from '../components/base';
import 'twin.macro';
import NounBubble from '../components/nounBubble';
import tw, { styled } from 'twin.macro';
import { useMemo } from 'react';


const Home: React.FC<{users: any}> = (users) => {
  const nounsForBubble: {text: string, width: number}[] = useMemo(() => [
    {text: 'programmer', width: 16},
    {text: 'creative',width: 12},
    {text: 'musician',width: 13},
    {text: 'photographer',width: 16},
    {text: 'vocalist',width: 10},
    {text: 'coffee snob',width: 16},
    {text: 'human',width: 10},
    {text: 'gamer',width: 9},
    {text: 'husband',width: 13},
    {text: 'enneagram 9',width: 16},
    {text: 'lego builder',width: 15},
    {text: 'programmer',width: 16},
  ], []);

  return (
    <>
      <Head>
        <title>Nick Barrs / Home</title>
      </Head>
      <Col tw="items-start justify-center h-full text-black dark:text-bone">
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
              <NounBubble nouns={nounsForBubble}/>
            </NounBubbleContainer>
          </IsANounContainer>
          <LivingWorkingText>
            living and working in New York City.
          </LivingWorkingText>
        </DescriptionContainer>
      </Col>
    </>
  )
}

const NameRow = styled(Row)(() => [
  tw`
    pb-3 lg:pb-4
  `
])

const NameText = styled.p(() => [
  tw`
    -translate-x-2
    font-bold tracking-tighter
    leading-[7rem] lg:leading-[10rem]
    text-[8rem] lg:text-[12rem] 
    w-1/2 md:w-full
    duration-100
  `
])

const DescriptionContainer = styled(Col)(() => [
  tw`
    items-start lg:items-center
    tracking-tight 
    lg:flex-row
    text-3xl lg:text-4xl
    max-w-xs lg:max-w-full
    duration-100
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
  // honestly not sure why i need scale-100 but it breaks if i don't have it
  tw`
    scale-100
    mx-3
  `
])

const LivingWorkingText = styled.p(() => [
  tw`
    font-medium
    leading-[3rem] lg:leading-[4rem]
    lg:whitespace-nowrap
  `
])

export default Home