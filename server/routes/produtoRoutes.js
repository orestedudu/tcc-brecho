const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {criarProduto, listarProdutos} = require('../controllers/produtosController');

// Rotas dos agendamentos. O próprio nome do controller que ela usa diz sua função
// mais caso vocês se confundam, sugiro comentar as rotas igual os controllers.

router.post('/', authMiddleware, criarProduto);
router.get('/mostrar', authMiddleware, listarProdutos);


module.exports = router;
