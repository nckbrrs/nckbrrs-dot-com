import React from 'react'
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="theme-color" content="#fbf6f1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="mask-icon" href="/icon.svg" color="#212121"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// This code prevents a Flash Of Unstyled Content (FOUC)
// on load. Without it, the styles are only added once
// react loads on the frontend
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheet.getStyleElement()}
        </React.Fragment>,
      ],
    }
  } finally {
    sheet.seal()
  }
}

export default MyDocument;