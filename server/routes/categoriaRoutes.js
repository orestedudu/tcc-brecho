const express = require("express");
const router = express.Router();
const {
  criarCategoria,
  listarCategorias,
  atualizarCategoria,
  excluirCategoria
} = require("../controllers/categoriaController");

router.post("/", criarCategoria);
router.get("/", listarCategorias);
router.put("/:id", atualizarCategoria);
router.delete("/:id", excluirCategoria);

module.exports = router;
