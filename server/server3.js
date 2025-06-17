import { graphql, buildSchema } from "graphql";
import express from 'express';
import {graphqlHTTP} from 'express-graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return "Hello server 3!";
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})
);

app.listen(4003);
console.log('http://localhost:4003/graphql');
