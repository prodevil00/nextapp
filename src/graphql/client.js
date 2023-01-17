import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import Config from "../../config";

const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

const link = createHttpLink({
	uri: Config.GRAPHQL_ENDPOINT,
})

const client = new ApolloClient({
    link,
    cache,
    defaultOptions,
	fetchOptions: {
		mode: 'no-cors',
	  },
});

export default client;
