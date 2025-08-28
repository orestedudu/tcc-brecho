const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/', categoriaController.createCategoria); // Criar categoria
router.get('/', categoriaController.getCategorias);   // Listar categorias
router.get('/:id', categoriaController.getCategoriaById); // Buscar por ID
router.put('/:id', categoriaController.updateCategoria);  // Atualizar
router.delete('/:id', categoriaController.deleteCategoria); // Deletar

module.exports = router;
