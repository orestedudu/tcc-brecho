const express = require("express");
const router = express.Router();
const {
  criarCategoria,
  listarCategorias,
  atualizarCategoria,
  excluirCategoria
} = require("../controllers/categoriaController");

router.post("/criar", criarCategoria);
router.get("/listar", listarCategorias);
router.put("/atualizar/:id", atualizarCategoria);
router.delete("/excluir/:id", excluirCategoria);

module.exports = router;
