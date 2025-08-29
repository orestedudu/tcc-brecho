const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
  categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true},
  nome: {type: String, required: true},
  preco: {type: Number, required: true},
  tamanho: {type: String, required: true},
  cor: {type: String, required: true},
  observacoes: String,
 
}, {
  timestamps: true
});

module.exports = mongoose.model('Produto', produtoSchema);
