const Produto = require('../models/Produto');

// Criar novo produto
const createProduto = async (req, res) => {
  const { categoria, preco, tamanho, cor, observacoes } = req.body;

  try {
    const newProduto = new Produto({
      admin: req.userId,
      categoria,
      preco,
      tamanho,
      cor,
      observacoes
    });

    await newProduto.save();
    res.status(201).json(newProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
};

module.exports ={
  createProduto
};