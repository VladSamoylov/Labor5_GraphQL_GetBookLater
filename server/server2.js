import express from "express";
import schema from './schema.js';
import {graphql} from 'graphql';
import bodyParser from 'body-parser';

let app = express();
let port = 4002;

app.use(bodyParser.text({type: 'application/graphql'}));

app.post('/graphql', (req, res) => {
    graphql(schema, req.body).then( 
        (result) => {
        res.send(JSON.stringify(result, null, 2));
    });
});

let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('graphQL in listening at http://%s:%s', host, port);
});