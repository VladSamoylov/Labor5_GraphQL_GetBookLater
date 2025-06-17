import express from 'express';
import schema from './schema.js';
import { graphql } from 'graphql';

const app = express();
const port = 4002;

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.text({type: 'application/graphql'}));

app.post('/graphql', (req, res) => {
  let query;
  if(req.is('application/json')) {
    query = req.body.query;
  } else if (req.is('application/graphql')) {
    query = req.body;
  } else {
    return res.status(400).json({ error: 'No query provided' });
  }

  graphql({
    schema,
    source: query,
  }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

app.listen(port, () => {
  console.log(`GraphQL server running at http://localhost:${port}/graphql`);
});