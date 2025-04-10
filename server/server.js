// Servidor Express que roda por cima do Node (servidor simples)

const express = require('express');
const server = express();

server.get('/', (_, res) => {
  res.send ('Hello EXPRESSSSSSSSSSSSS!');
});

server.listen(3000, () => {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
