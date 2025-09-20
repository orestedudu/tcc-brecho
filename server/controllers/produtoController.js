const Produto = require("../models/Produto");

// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const {nome, preco, tamanho,cor,observacoes} = req.body;
    const produto = new Produto({nome, preco, tamanho, cor, observacoes});
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
      .populate("categoria", "nome descricao") // traz info da categoria
      .sort({ createdAt: -1 });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};
