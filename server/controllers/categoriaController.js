const Categoria = require('../models/Categoria');

// Criar nova categoria
const createCategoria = async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const novaCategoria = new Categoria({ nome, descricao });
    await novaCategoria.save();
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

// Listar categorias
const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ criadoEm: -1 });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};

// Buscar categoria por ID
const getCategoriaById = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
};

// Atualizar categoria
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  try {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    if (nome) categoria.nome = nome;
    if (descricao) categoria.descricao = descricao;

    await categoria.save();
    res.json({ message: 'Categoria atualizada com sucesso', categoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
};

// Deletar categoria
const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByIdAndDelete(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar categoria' });
  }
};

module.exports = {
  createCategoria,
  getCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
};

