const express = require("express");
const router = express.Router();
const {
  criarCategoria,
  listarCategorias,
  atualizarCategoria,
  excluirCategoria
} = require("../controllers/categoriaController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/criar", authMiddleware, criarCategoria);
router.get("/listar", authMiddleware, listarCategorias);
router.put("/atualizar/:id", authMiddleware, atualizarCategoria);
router.delete("/excluir/:id",authMiddleware, excluirCategoria);

module.exports = router;
