
const adminMiddleware = (req, res, next) => {
  if (req.userTipo !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado: administrador somente.' });
  }
  next();
};

module.exports = adminMiddleware;
