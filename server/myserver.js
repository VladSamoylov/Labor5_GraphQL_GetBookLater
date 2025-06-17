import express from "express";
import schema from "./myschema";
import { graphqlHTTP } from "express-graphql";
import cors from'cors';

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
})
);

app.listen(4004, () => {
    console.log('http://localhost:4004/graphql');
});