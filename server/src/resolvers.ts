import { Topic } from './models/topics';
// import magic from './magic';
import visionApi from './visionApi';

export const resolvers = {
  Query: {
    topics: async (_:null, args:{input: {title: string}}) => {
      const { input } = args;
      console.log('in the backend now');
      // visionApi('https://v1.nitrocdn.com/kDXDIJNDOaszRbpagqNqUtquAQQkiLpO/assets/static/optimized/rev-ddee88e/wp-content/uploads/2020/03/Q1a_Atoms-Isotopes_Atomic-Structure__GCSE_AQA_Physics.png');
      visionApi(input.title);
      // const output = magic(input);
      const hardCode = {title: "Current"}
      return await Topic.find(hardCode).exec();
    }
  },
};