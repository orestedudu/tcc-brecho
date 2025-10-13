const Produto = require("../models/Produto");

// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const {nome, preco, tamanho,cor,observacoes} = req.body;
    const produto = new Produto({
      admin: req.userId,
      nome, 
      preco,
      tamanho,
      cor, 
      observacoes
    });
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar produto", error });
  }
};


// Listar produtos com categoria
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find() 
      .sort({ createdAt: -1 });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};



// Listar agendamentos, permitindo o filtro de status (agendamento pendente, concluido etc)
const getAppointments = async (req, res) => {
  const userId = req.userId;
  const { status } = req.query;

  const filtro = { client: userId };
  if (status) filtro.status = status;

  try {
    const agendamentos = await Appointment.find(filtro).sort({ date: 1 });
    res.json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos' });
  }
};

