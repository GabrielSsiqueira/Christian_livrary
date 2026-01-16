const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const SECRET = require('../config/auth');

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const hash = await bcrypt.hash(senha, 10);

      const user = await Usuario.create({
        nome,
        email,
        senha: hash
      });

      res.json(user);
    } catch (err) {
      res.status(400).json({ erro: 'Usuário já existe' });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      },
      token
    });
  }
};
