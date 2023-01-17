import { ApolloProvider } from "@apollo/client"
import client from "../graphql/client"
import BlockApp from '../components/BlockApp'

function MyApp({ Component, pageProps}) {
  return (
    <>
    <BlockApp />
    <ApolloProvider client={client} >
    <Component {...pageProps} />
    </ApolloProvider>
    </>
    )
}

export default MyApp
