import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import Footer from '../components/Footer'
import Header from '../components/Header'

import { theme } from '../styles/theme'
import { makeServer } from '../services/mirage';
import { QueryClient, QueryClientProvider } from 'react-query'
import store from '../app/store';
import Layout from '../components/layout';

// if (process.env.NODE_ENV === 'development') {
//   makeServer()
// }

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

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <GlobalStyle>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalStyle>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp