const path = require('path');
const { Biblioteca, Livro } = require('../models');

module.exports = {
  async listar(req, res) {
    const livros = await Biblioteca.findAll({
      where: { user_id: req.user.id },
      include: Livro
    });

    res.json(livros);
  },

  async atualizarProgresso(req, res) {
    const { livro_id, progresso, pagina_atual } = req.body;

    const registro = await Biblioteca.findOne({
      where: {
        user_id: req.user.id,
        livro_id
      }
    });

    if (!registro) {
      return res.status(403).json({ erro: 'Livro não pertence ao usuário' });
    }

    registro.progresso = progresso;
    registro.pagina_atual = pagina_atual;
    registro.ultima_leitura = new Date();
    await registro.save();

    res.json({ sucesso: true });
  },

  async download(req, res) {
    const { livroId } = req.params;

    const registro = await Biblioteca.findOne({
      where: {
        user_id: req.user.id,
        livro_id: livroId
      },
      include: Livro
    });

    if (!registro) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const filePath = path.resolve(
      'src/uploads/livros',
      registro.Livro.arquivo
    );

    res.download(filePath);
  }
};
