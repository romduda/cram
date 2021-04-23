import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://10.153.106.115:4000/',
  cache: new InMemoryCache()
});

const cramToApi = function (imageURI: String): void {
  console.log('uri: ', imageURI);
  apolloClient.query({
    query: gql`
	    {
	      topics(input: {title: "Current"}) {
          id
        }
      }
    `,
    fetchPolicy: "network-only"
  }).then(result => console.log(result))
    .catch(err => console.error(err));
}

export { cramToApi, apolloClient }