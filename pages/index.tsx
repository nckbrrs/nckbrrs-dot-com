import Head from 'next/head'
import Image from 'next/image';

const Home: React.FC<{users: any}> = ({ users }) => {
  return (
    <>
      <Head>
        <title>Nick Barrs / Home</title>
      </Head>
    </>
  )
}

export default Home