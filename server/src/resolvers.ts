import { Topic } from './models/topics';
import magic from './magic';

export const resolvers = {
  Query: {
    topics: async (_:null, args:{input: {title: String}}) => {
      const { input } = args;
      console.log('in the backend', input);
      const output = magic(input);
      return await Topic.find(output).exec();
    }
  },
};

// import vision from '@google-cloud/vision';

// async function visionApi(url:string):Promise<any> {
//   // Creates a client
//   const client = new vision.ImageAnnotatorClient({
//     keyFilename: 'APIkey.json'
//   });

//   // Performs label detection on the image file
//   const result = await client.textDetection(url);
//   const googleStr = result[0].fullTextAnnotation?.text
//   console.log('google retrieved: ', googleStr);
// }

// export default visionApi;