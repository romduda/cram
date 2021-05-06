import { Topic } from "./models/topics";
import magic from "./magic";
import visionApi from "./visionApi";

export const resolvers = {
  Query: {
    topics: async (_: null, args: { input: { title: string } }) => {
      const { input } = args;
      const googleStr = await visionApi(input.title);

      // TODO: Wrap Topic.find in a try catch
      // TODO: Also check if typeof googleStr === 'string'
      if (!googleStr) return await Topic.find({ title: "Error" }).exec();

      const topicTitle = magic(googleStr);
      const topic = await Topic.find(topicTitle).exec();

      return topic;
    },
    furtherTopics: async (_: null, args: { input: { title: string } }) => {
      const { input } = args;
      const topic = await Topic.find(input).exec();

      return topic;
    },
  },
};
