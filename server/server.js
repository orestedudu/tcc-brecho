// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./mongo');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/agendamentos', appointmentRoutes);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
