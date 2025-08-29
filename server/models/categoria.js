const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
  nome: { type: String, required: true, trim: true, unique: true}, 
}, { timestamps: true });

module.exports = mongoose.model("Categoria", categoriaSchema);