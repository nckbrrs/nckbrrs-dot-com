import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'
import Layout from '../components/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  )
}