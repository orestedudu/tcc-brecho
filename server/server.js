// Servidor Express que roda por cima do Node (servidor simples)

const express = require('express');
const cors = require('cors');
const server = express();

// Accept requests the others locations
server.use(cors());
server.get('/', (_, res) => {
  res.send('Hello EXPRESSSSSSSSSSSSS!');
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

