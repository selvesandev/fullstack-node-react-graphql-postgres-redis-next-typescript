import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider, createClient, cacheExchange, fetchExchange, } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange
  ],
  fetchOptions: () => {
    // const token = getToken();
    return {
      // credentials: 'include',
      headers: { 
        // withCredentials: true,
        // authorization: token ? `Bearer ${token}` : '' 
      },
    };
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
    
  )
}

export default MyApp
