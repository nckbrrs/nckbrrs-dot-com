import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Nick Barrs",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="theme-color" content="#fbf6f1"/>
        <meta name="theme-color" content="#212121" media="(prefers-color-scheme: dark)"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=yes, viewport-fit=cover"/>
      </head>
      <body className={`antialiased`}>
        <AppContainer>
          <Header/>
          <ContentContainer>
            {children}
          </ContentContainer>
          <Footer/>
        </AppContainer>
      </body>
    </html>
  );
}

const AppContainer = (props: {children: React.ReactNode}) => (
  <div
    className={`
      flex
      flex-col
      min-h-screen
      w-screen [&>*]:max-w-[2000px]
      justify-between
      items-center
      px-5 md:px-16
      duration-500
    `}
  >
    {props.children}
  </div>
)

const ContentContainer = (props: {children: React.ReactNode}) => (
  <div 
    className={`
      flex
      flex-col
      w-full
      justify-start
    `}
  >
    {props.children}
  </div>
)