import { Topic } from './models/topics';
import magic from './magic';
import visionApi from './visionApi';

export const resolvers = {
  Query: {
    topics: async (_:null, args:{input: {title: string}}) => {
      console.log('in the bckend');
      const { input } = args;
      const googleStr = await visionApi(input.title);
      if (!googleStr) return await Topic.find({title: 'Error'}).exec();
      const topicTitle = magic(googleStr);
      const topic = await Topic.find(topicTitle).exec();
      return topic
    },
    furtherTopics: async (_:null, args:{input: {title: string}}) => {
      const { input } = args;
      const topic = await Topic.find(input).exec();
      return topic
    }
  }
};