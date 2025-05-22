// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Pega o token do header Authorization (Bearer token)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Pega só o token, tira o "Bearer "

  try {
    // Verifica o token com a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona o id no req para usar nas rotas protegidas
    req.userId = decoded.id; 

    next(); // Passa para a próxima middleware/rota
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;
