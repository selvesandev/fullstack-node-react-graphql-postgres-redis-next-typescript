import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider, createClient, cacheExchange, fetchExchange, } from 'urql';
import { getAccessToken } from '../utils/authToken';


const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange
  ],
  fetchOptions: () => {
    const jat = getAccessToken('jat');
    return {
      credentials: 'include',
      headers: { 
        authorization: jat ? `Bearer ${jat}` : '' 
      },
    };
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  console.log('my app');
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
    
  )
}

export default MyApp
