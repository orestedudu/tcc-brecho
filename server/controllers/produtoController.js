const Produto = require("../models/Produto");

// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, tamanho, cor, observacoes, categoria } = req.body;
    const produto = new Produto({
      admin: req.userId,
      categoria,
      nome,
      preco,
      tamanho,
      cor,
      observacoes
    });
    if (!categoria) {
      return res.status(400).json({
        mensagem: "Selecione uma categoria."
      });
    }
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      mensagem: error.message
    });
  }
};


// Listar produtos com categoria
exports.listarProdutos = async (req, res) => {
  try {

    const { categoria, ordenacao } = req.query;

    const filtro = {
      admin: req.userId
    };

    // Filtrar por categoria
    if (categoria) {
      filtro.categoria = categoria;
    }

    // Ordenação padrão
    let ordenar = {
      nome: 1
    };

    // Ordenações disponíveis
    switch (ordenacao) {

      case "precoAsc":
        ordenar = { preco: 1 };
        break;

      case "precoDesc":
        ordenar = { preco: -1 };
        break;

      default:
        ordenar = { nome: 1 };
    }

    const produtos = await Produto.find(filtro)
      .populate("categoria", "nome")
      .sort(ordenar);

    res.json(produtos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao buscar produtos."
    });

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


