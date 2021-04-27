import { Topic } from '../models/topics';

const seedDb = async () => {

  await Topic.remove({});

  const topics = [
    new Topic({
      title: 'Error',
      url: 'Sorry text not recognised, please try again',
      related: []
    }),
    new Topic({
      title: 'Not Found',
      url: 'Sorry no materials available at present. Check out some of the other available materials!',
      related: ['Koa', 'Node', 'Express', 'Apollo', 'REST', 'HTTP', 'MongoDB', 'SQL']
    }),
    new Topic({
      title: 'Express',
      url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
      related: ['Koa', 'Node'],
      bullets: [
        `const express = require('express')`,
        `router = express.Router()`,
        `app.get('/', (req, res) => res.send('Hello World!'))`
      ]
    }),
    new Topic({
      title: 'Koa',
      url: 'https://www.youtube.com/watch?v=z84uTk5zmak',
      related: ['Express', 'Node'],
      bullets: [
        `const Koa = require('koa');`,
        `const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'Node',
      url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
      related: ['Koa', 'Express'],
      bullets: [
        `const http = require('http');
         const hostname = '127.0.0.1';
         const port = 3000;`,
        `const server = http.createServer((req, res) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello World');
        });`,
        `server.listen(port, hostname, () => {
          console.log('Server running at http://hostname:port/');
        });`
      ]
    }),
    new Topic({
      title: 'GraphQL',
      url: 'https://www.youtube.com/watch?v=Y0lDGjwRYKw',
      related: ['Apollo', 'REST'],
      bullets: [
        `type Query {
          me: User
        }`,
        `function Query_me(request) {
          return request.auth.user;
        }`,
        `{
        "me": { "name": "Luke Skywalker" }
        }`
      ]
    }),
    new Topic({
      title: 'Apollo',
      url: 'https://www.youtube.com/watch?v=mSzUb7f47qk',
      related: ['GraphQL', 'Express'],
      bullets: [
        `import { ApolloClient, InMemoryCache } from '@apollo/client';
        const client = new ApolloClient({
          cache: new InMemoryCache()
        });`,
        `const { loading, error, data } = useQuery(EXCHANGE_RATES);`
      ]
    }),
    new Topic({
      title: 'REST',
      url: 'https://www.youtube.com/watch?v=qbLc5a9jdXo',
      related: ['GraphQL', 'HTTP'],
      bullets: [
        `200 OK; 201 Created; 202 Accepted; 204 No content; 206 Partial content`,
        `401 Unauthorized; 403 Forbidden; 422 Unprocessable entity`,
        `GET;
        PUT;
        DELETE;
        POST`
      ]
    }),
    new Topic({
      title: 'HTTP',
      url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0',
      related: ['GraphQL', 'REST'],
      bullets: [
        `HTTP is a protocol which allows the fetching of resources, such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser.`,
        `A complete document is reconstructed from the different sub-documents fetched, for instance text, layout description, images, videos, scripts, and more.`,
        `Due to its extensibility, it is used to not only fetch hypertext documents, but also images and videos or to post content to servers, like with HTML form results. HTTP can also be used to fetch parts of documents to update Web pages on demand.`
      ]
    }),
    new Topic({
      title: 'SQL',
      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      related: ['MongoDB', 'Sequelize'],
      bullets: [
        `SELECT * FROM users;`,
        `INSERT INTO users (first_name, last_name, address, email)
        VALUES (‘Tester’, ‘Jester’, ‘123 Fake Street, Sheffield, United
        Kingdom’, ‘test@lukeharrison.dev’);`,
        `DROP TABLE users;`
      ]
    }),
    new Topic({
      title: 'MongoDB',
      url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
      related: ['SQL', 'Mongoose'],
      bullets: [
        `db.createCollection('posts')`,
        `db.posts.insert({
          title: 'Post One',
          body: 'Body of post one',
          category: 'News',
          tags: ['news', 'events'],
          user: {
            name: 'John Doe',
            status: 'author'
          },
          date: Date()
        })`
      ]
    }),
  ];

  for (let i=0; i<topics.length; i++) {
    await topics[i].save();
  }

  (async () => {
    const data = await Topic.find({});
    console.log(data);
  })();

}

seedDb();