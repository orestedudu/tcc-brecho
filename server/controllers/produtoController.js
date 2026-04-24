const Produto = require("../models/Produto");

// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, tamanho, cor, observacoes } = req.body;
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

// atualizar produto
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, tamanho, cor, observacoes } = req.body;

  if (!nome) {
    return res
      .status(400)
      .json({ mensagem: "O nome do produto é obrigatório." });
  }

  try {

    const produto = await Produto.findByIdAndUpdate(
      id,
      { nome, preco, tamanho, cor, observacoes },
      { new: true } // retorna a categoria atualizada
    );

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    if (nome) produto.nome = nome;
    if (preco) produto.preco = preco;
    if (tamanho) produto.tamanho = tamanho;
    if (cor) produto.cor = cor;
    if (observacoes) produto.observacoes = observacoes;


    await produto.save();

    res.json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar o produto' });
  }
};

// Excluir produto
exports.excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao deletar produto' });
  }
};


