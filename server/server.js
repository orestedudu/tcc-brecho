// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./mongo');
const userRoutes = require('./routes/userRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const { PORT } = require('./config');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/produto', produtoRoutes);
app.use('/api/catregotia', categoriaRoutes);


app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
