import React, { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import store from '../app/store';

const GlobalStyle = ({ children }: { children: ReactNode }) => {
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
            <Component {...pageProps} />
          </GlobalStyle>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp