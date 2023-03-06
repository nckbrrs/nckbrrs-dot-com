import Head from 'next/head'
import { Col, Row, RowCentered, TextPrimary } from '../components/base';
import 'twin.macro';
import NounBubble from '../components/nounBubble';

const Home: React.FC<{users: any}> = ({ users }) => (
  <>
    <Head>
      <title>Nick Barrs / Home</title>
      <meta charSet="utf-8"/>
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=yes, viewport-fit=cover"
      />
    </Head>
    <Col tw="items-start justify-center h-full">
      <Row tw="pb-3 sm:pb-4">
        <TextPrimary tw="-translate-x-2 leading-[7rem] text-[9rem] sm:leading-[10rem] sm:text-[12rem] font-medium tracking-tighter">
          nick <span tw="tracking-tight">barrs</span>
        </TextPrimary>
      </Row>

      <Row tw="items-center w-[21rem] lg:w-full tracking-tight">
        <TextPrimary tw="text-3xl font-medium">
          is a 
        </TextPrimary>
        <span tw="scale-[0.8] -translate-x-3 sm:scale-100 sm:translate-x-0 sm:translate-y-0 sm:px-3">
          <NounBubble/>
        </span>
        <TextPrimary tw="text-3xl font-medium leading-[3rem] sm:leading-[4rem] -translate-y-2 sm:translate-y-0">
          living and working in New York City.
        </TextPrimary>
      </Row>
       
    </Col>
  </>
)

export default Home