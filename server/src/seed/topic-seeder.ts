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
        `const Koa = require('koa'); const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'GraphQL',
      url: 'https://www.youtube.com/watch?v=Y0lDGjwRYKw',
      related: ['Apollo', 'REST'],
      bullets: [
        `const Koa = require('koa'); const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'Apollo',
      url: 'https://www.youtube.com/watch?v=mSzUb7f47qk',
      related: ['GraphQL', 'Express'],
      bullets: [
        `const Koa = require('koa'); const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'REST',
      url: 'https://www.youtube.com/watch?v=qbLc5a9jdXo',
      related: ['GraphQL', 'HTTP'],
      bullets: [
        `const Koa = require('koa'); const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'HTTP',
      url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0',
      related: ['GraphQL', 'REST'],
      bullets: [
        `const Koa = require('koa'); const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'SQL',
      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      related: ['MongoDB', 'Sequelize'],
      bullets: [
        `const Koa = require('koa'); const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`
      ]
    }),
    new Topic({
      title: 'MongoDB',
      url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
      related: ['SQL', 'Mongoose'],
      bullets: ['bullet1', 'bullet2']
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