import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider, createClient, fetchExchange } from 'urql';
import { getAccessToken } from '../utils/authToken';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { LoginMutation, MeDocument, MeQuery } from '../generated/graphql';
// import { MeDocument } from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn:(r:Result, q:Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    // cacheExchange,
    cacheExchange({
      updates: {
        Mutation: {
          Login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {query: MeDocument},
              _result,
              (result,query) => {
                console.log(result);
                if(result.login.error){
                  return query;
                } else {
                  console.log(result);
                  return {
                    // me: result.login
                  }
                }
              }
            )
            // cache.updateQuery({query:MeDocument},(data) => {
            //   console.log(data);
            // });
            // console.log('cacheExchange mutation')
          },
        }
      }
    }),
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
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
    
  )
}

export default MyApp
