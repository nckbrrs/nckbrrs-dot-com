import NounBubble from "@/components/ui/NounBubble";
import { useMemo } from "react";

const Home: React.FC = () => {
  const nounsForBubble: {text: string, width: number}[] = useMemo(() => [
    {text: 'human',width: 10},
    {text: 'programmer', width: 16},
    {text: 'creative',width: 12},
    {text: 'musician',width: 13},
    {text: 'photographer',width: 16},
    {text: 'vocalist',width: 10},
    {text: 'coffee snob',width: 16},
    {text: 'gamer',width: 9},
    {text: 'husband',width: 13},
    {text: 'enneagram 9',width: 16},
    {text: 'lego builder',width: 15},
    {text: 'human',width: 10},
  ], []);

  return (
    <Container>
      <NameRow>
        <NameText>
          nick <span className="tracking-tight">barrs</span>
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
    </Container>
  )
}

const Container = (props: {children: React.ReactNode}) => (
  <div
    className={`
      flex
      flex-col
      items-start
      justify-center
      h-full
      text-black
      dark:text-bone
    `}
  >
    {props.children}
  </div>
)

const NameRow = (props: {children: React.ReactNode}) => (
  <div
    className={`
      flex
      flex-row
      pb-3 lg:pb-4
    `}
  >
    {props.children}
  </div>
)

const NameText = (props: {children: React.ReactNode}) => (
  <p
    className={`
      -translate-x-2
      font-bold
      tracking-tighter
      leading-[7rem] lg:leading-[10rem]
      text-[8rem] lg:text-[12rem]
      w-1/2 md:w-full
      duration-100
    `}
  >
    {props.children}
  </p>
)

const DescriptionContainer = (props: {children: React.ReactNode}) => (
  <div
    className={`
      flex
      flex-col
      items-start lg:items-center
      tracking-tight
      lg:flex-row
      text-3xl lg:text-4xl
      max-w-xs lg:max-w-full
      duration-100
    `}
  >
    {props.children}
  </div>
)

const IsANounContainer = (props: {children: React.ReactNode}) => (
  <div
    className={`
      flex
      flex-row
      w-fit
      items-center
    `}
  >
    {props.children}
  </div>
)

const IsAText = (props: {children: React.ReactNode}) => (
  <p
    className={`
      font-medium
      whitespace-nowrap
    `}
  >
    {props.children}
  </p>
)

const NounBubbleContainer = (props: {children: React.ReactNode}) => (
  <div
    className={`
      scale-100 mx-3
    `}
  >
    {props.children}
  </div>
)

const LivingWorkingText = (props: {children: React.ReactNode}) => (
  <p
    className={`
      font-medium
      leading-[3rem] lg:leading-[4rem]
      lg:whitespace-nowrap
    `}
  >
    {props.children}
  </p>
)


export default Home;