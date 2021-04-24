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
      title: 'Express',
      url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
      related: ['Koa', 'Node']
    }),
    new Topic({
      title: 'Koa',
      url: 'https://www.youtube.com/watch?v=z84uTk5zmak',
      related: ['Express', 'Node']
    })
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