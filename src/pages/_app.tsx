import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import type { AppProps } from "next/app";

import Footer from '../components/Footer'
import Header from '../components/Header'

import { theme } from '../styles/theme'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;

            footer {
              margin-top: auto;
            }
          }


          


        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </GlobalStyle>
    </ChakraProvider>
  )
}

export default MyApp