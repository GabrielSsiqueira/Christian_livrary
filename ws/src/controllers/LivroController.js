const { Livro, Categoria } = require('../models');

module.exports = {

  // CREATE
  async create(req, res) {
    try {
      const { titulo, descricao, autor, preco, categoria_id } = req.body;

      if (!titulo || !autor || !preco || !categoria_id) {
        return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
      }

      const livro = await Livro.create({
        titulo,
        descricao,
        autor,
        preco,
        categoria_id,
        capa: req.files?.capa?.[0]?.filename || null,
        arquivo: req.files?.arquivo?.[0]?.filename || null,
        formato: 'pdf'
      });

      res.status(201).json(livro);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  // LISTAR TODOS
  async list(req, res) {
    const livros = await Livro.findAll({
      include: Categoria
    });
    res.json(livros);
  },

  // LISTAR POR CATEGORIA
  async listByCategoria(req, res) {
    const livros = await Livro.findAll({
      where: { categoria_id: req.params.categoriaId },
      include: Categoria
    });
    res.json(livros);
  },

  // SHOW
  async show(req, res) {
    const livro = await Livro.findByPk(req.params.id, {
      include: Categoria
    });

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json(livro);
  },

  // UPDATE
  async update(req, res) {
    try {
      const livro = await Livro.findByPk(req.params.id);

      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }

      const { titulo, descricao, autor, preco, categoria_id } = req.body;

      await livro.update({
        titulo,
        descricao,
        autor,
        preco,
        categoria_id,
        capa: req.files?.capa?.[0]?.filename || livro.capa,
        arquivo: req.files?.arquivo?.[0]?.filename || livro.arquivo
      });

      res.json(livro);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  // DELETE
  async delete(req, res) {
    const livro = await Livro.findByPk(req.params.id);

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    await livro.destroy();
    res.json({ mensagem: 'Livro removido com sucesso' });
  }
};
