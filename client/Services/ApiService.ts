import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import pathToBase64 from './ImageService';

const APOLLOCLIENT_HOST = process.env.APOLLOCLIENT_HOST;
const APOLLOCLIENT_PORT = process.env.APOLLOCLIENT_PORT;

const apolloClient = new ApolloClient({
  uri: `http://${APOLLOCLIENT_HOST}:${APOLLOCLIENT_PORT}/`,
  cache: new InMemoryCache(),
});

// ipconfig getifaddr en0

const cramToApi = async function (imageURI: string): Promise<any> {
  const imgBase64 = await pathToBase64(imageURI);
  return apolloClient
    .query({
      query: gql`
	    {
	      topics(input: {title: "${imgBase64}"}) {
          title
          url
          related,
          bullets
        }
      }
    `,
      fetchPolicy: 'network-only',
    })
    .then((result) => result.data.topics[0])
    .catch((err) => console.error(err));
};

const furtherTopics = async function (title: string): Promise<any> {
  return apolloClient
    .query({
      query: gql`
	    {
	      furtherTopics(input: {title: "${title}"}) {
          title
          url
          related
          bullets
        }
      }
    `,
      fetchPolicy: 'network-only',
    })
    .then((result) => result.data.furtherTopics[0])
    .catch((err) => console.error(err));
};

export { cramToApi, furtherTopics, apolloClient };
