const { ApolloServer } = require('apollo-server-fastify');
const { getItem, getItems, createItem, updateItem, deleteItem } = require('./Controller/User');
const { buildSchema } = require('graphql');
const fastify = require('fastify');
const { pool } = require('./Db');

const typeDefs = `
  type Item {
    id: ID!
    name: String!
  }

  type Query {
    getItem(id: ID!): Item
    getItems: [Item]!
  }

  type Mutation {
    createItem(name: String!): Item!
    updateItem(id: ID!, name: String!): Item!
    deleteItem(id: ID!): Item!
  }
`;

const resolvers = {
  Query: {
    getItem: (_, { id }) => getItem(id),
    getItems: () => getItems()
  },
  Mutation: {
    createItem: (_, { name }) => createItem(name),
    updateItem: (_, { id, name }) => updateItem(id, { name }),
    deleteItem: (_, { id }) => deleteItem(id)
  },
};

const schema = buildSchema(typeDefs);

const server = fastify();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pool },
});

const startServer = async () => {
  await apolloServer.start();
  server.register(apolloServer.createHandler());

  const PORT = 4000;
  server.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
