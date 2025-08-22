const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {type: String, required: true, unique: true,},
  email: {type: String, required: true, unique: true,},
  senha: {type: String, required: true,},
}, { timestamps: true });

module.exports = mongoose.model('Usuario', userSchema);
