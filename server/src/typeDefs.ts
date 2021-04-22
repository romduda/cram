import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Topic {
    id: ID!
    title: String
    url: String
  }

  input TopicInput {
    title: String
  }

  type Query {
    topics(input: TopicInput): [Topic]
  }
`;