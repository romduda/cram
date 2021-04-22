import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://10.153.104.129:4000/',
  cache: new InMemoryCache()
});

const cramToApi = function (imageURI: String): void {
  const data = new FormData();
  data.append('my_photo', {
    uri: imageURI,
    name: 'my_photo.jpg',
    type: 'image/jpg'
  })
  console.log('data: ', data);
  apolloClient.query({
    query: gql`
      {
	      topics(input: {title: "Current"}) {
		    id
        url
	      }
      }
    `
  }).then(result => console.log(result))
    .catch(err => console.error(err));
}

export { cramToApi, apolloClient}