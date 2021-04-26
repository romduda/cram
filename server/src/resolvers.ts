import { Topic } from './models/topics';
import magic from './magic';
import visionApi from './visionApi';

export const resolvers = {
  Query: {
    topics: async (_:null, args:{input: {title: string}}) => {
      const { input } = args;
      console.log('in the backend now');
      const googleStr = await visionApi(input.title);
      if (!googleStr) return await Topic.find({title: 'Error'}).exec();
      const topicTitle = magic(googleStr);
      const topic = await Topic.find(topicTitle).exec();
      console.log('heres the topic from the db', topic);
      return topic
    },
    furtherTopics: async (_:null, args:{input: {title: string}}) => {
      const { input } = args;
      console.log('in the backend now for further');
      const topic = await Topic.find(input).exec();
      console.log('heres the topic from the db', topic);
      return topic
    }
  }
};