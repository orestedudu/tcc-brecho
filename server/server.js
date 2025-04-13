// Servidor Express que roda por cima do Node (servidor simples)

const express = require('express');
const cors = require('cors');
const mongo = require('./mongo');

const server = express();
server.use(cors());

// Accept requests the others locations
server.get('/', (_, res) => {
  mongo
    .collection()
    .findOne({ greeting: 'Hello Mongo'})
    .then((document) => res.json(`${document.greeting} + Express`));
});

// First, establish the connection to the DB, and then run the server.
const port = 3001;
mongo.connect().then(() => {
  server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`)
  })
})