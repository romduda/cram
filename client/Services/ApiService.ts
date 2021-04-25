import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import pathToBase64 from './ImageService';

const apolloClient = new ApolloClient({
  uri: 'http://192.168.8.107:4000/',
  cache: new InMemoryCache()
});

// ipconfig getifaddr en0

const cramToApi = async function (imageURI: string): Promise<any> {
  console.log('request made');
  const imgBase64 = await pathToBase64(imageURI);
  return apolloClient.query({
    query: gql`
	    {
	      topics(input: {title: "${imgBase64}"}) {
          title
          url
          related
        }
      }
    `,
    fetchPolicy: "network-only"
  }).then(result => {
    console.log('heres the topic : ', result.data.topics[0]);
    return result.data.topics[0];
  }).catch(err => console.error(err));
}

export { cramToApi, apolloClient }