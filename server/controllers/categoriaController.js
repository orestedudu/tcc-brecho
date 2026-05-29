// server/controllers/categoriaController.js
const Categoria = require("../models/Categoria");
const Produto = require("../models/Produto");

// Criar uma nova categoria
exports.criarCategoria = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res
        .status(400)
        .json({ mensagem: "O nome da categoria é obrigatório." });
    }

    const novaCategoria = new Categoria({
      admin: req.userId,
      nome,
      descricao,
    });

    await novaCategoria.save();

    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao criar categoria." });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {

    const categorias = await Categoria.find({
      admin: req.userId
    }).sort({ createdAt: -1 });

    const categoriasComQuantidade = await Promise.all(
      categorias.map(async (categoria) => {

        const quantidadeProdutos = await Produto.countDocuments({
          categoria: categoria._id
        });

        return {
          ...categoria._doc,
          quantidadeProdutos
        };
      })
    );

    // console.log(categoriasComQuantidade);
    res.json(categoriasComQuantidade);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao listar categorias."
    });
  }
};

// Atualizar uma categoria pelo ID
exports.atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!nome) {
      return res
        .status(400)
        .json({ mensagem: "O nome da categoria é obrigatório." });
    }

    const categoriaAtualizada = await Categoria.findByIdAndUpdate(
      id,
      { nome, descricao },
      { new: true } // retorna a categoria atualizada
    );

    if (!categoriaAtualizada) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    res.json(categoriaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao atualizar categoria." });
  }
};

// Excluir uma categoria pelo ID
exports.excluirCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaExcluida = await Categoria.findByIdAndDelete(id);

    if (!categoriaExcluida) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    res.json({ mensagem: "Categoria excluída com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao excluir categoria." });
  }
};


