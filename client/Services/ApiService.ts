import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import pathToBase64 from './ImageService';

const apolloClient = new ApolloClient({
  uri: 'http://10.153.106.115:4000/',
  cache: new InMemoryCache()
});

const cramToApi = async function (imageURI: string): Promise<void> {
  console.log('uri: ', imageURI);
  const imgBase64 = await pathToBase64(imageURI);
  console.log('heres the encoded: ', imgBase64);
  apolloClient.query({
    query: gql`
	    {
	      topics(input: {title: "Currednt"}) {
          id
        }
      }
    `,
    fetchPolicy: "network-only"
  }).then(result => console.log(result))
    .catch(err => console.error(err));
}

export { cramToApi, apolloClient }