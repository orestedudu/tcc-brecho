const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Criação de novo agendamento
router.post('/', authMiddleware, async (req, res) => {
    console.log('Usuário logado (req.userId):', req.userId); // <--- Adicione isso
  const { date, service, notes } = req.body;

  try {
    const newAppointment = new Appointment({
      client: req.userId,
      date,
      service,
      notes
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ client: req.userId }).sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar agendamento' });
  }
});

// Rota para listar todos os agendamentos (apenas para admin)
router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('client', 'nome email');
    res.status(200).json(appointments);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar agendamentos', erro: erro.message });
  }
});

// Exibir agendamento por ID (somente se pertencer ao usuário)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOne({ _id: id, client: req.userId });

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar agendamento' });
  }
});

// Editar agendamento por ID (somente se pertencer ao usuário)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { date, time, service } = req.body;

  try {
    const appointment = await Appointment.findOne({ _id: id, client: req.userId });

    if (!appointment) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
    }

    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (service) appointment.service = service;

    await appointment.save();

    res.json({ mensagem: 'Agendamento atualizado com sucesso', agendamento: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar agendamento' });
  }
});

// Deletar agendamento por ID (somente se pertencer ao usuário)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOneAndDelete({ _id: id, client: req.userId });

    if (!appointment) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
    }

    res.json({ mensagem: 'Agendamento deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao deletar agendamento' });
  }
});

// Atualizar status do agendamento (apenas admin)
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pendente', 'confirmado', 'concluido'].includes(status)) {
    return res.status(400).json({ mensagem: 'Status inválido' });
  }

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json({ mensagem: 'Status atualizado com sucesso', appointment });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar status', erro: error.message });
  }
});

module.exports = router;
