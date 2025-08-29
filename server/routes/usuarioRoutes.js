const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');

//exibir informaçoes do perfil de usuario e editar informaçoes do usuario, e adicionar foto no perfil.
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
