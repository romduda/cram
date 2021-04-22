import { Topic } from './models/topics';
import magic from './magic';
import visionApi from './visionApi';

export const resolvers = {
  Query: {
    topics: async (_:null, args:{input: {title: String}}) => {
      const { input } = args;
      console.log('in the backend now', input);
      visionApi('https://v1.nitrocdn.com/kDXDIJNDOaszRbpagqNqUtquAQQkiLpO/assets/static/optimized/rev-ddee88e/wp-content/uploads/2020/03/Q1a_Atoms-Isotopes_Atomic-Structure__GCSE_AQA_Physics.png');
      const output = magic(input);
      return await Topic.find(output).exec();
    }
  },
};