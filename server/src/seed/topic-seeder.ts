import { Topic } from '../models/topics';

const seedDb = async () => {

  await Topic.remove({});

  const topics = [
    new Topic({
      title: 'Electromagnets',
      url: 'https://www.youtube.com/watch?v=V30Rpqi6kYE'
    }),
    new Topic({
      title: 'Current',
      url: 'https://www.youtube.com/watch?v=YFkJGEefgU8'
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