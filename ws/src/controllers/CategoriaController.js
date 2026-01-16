const { Categoria } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
  // Criar categoria (ADMIN)
  async create(req, res) {
    try {
      console.log(rq.file);
      
      const { titulo, descricao } = req.body;

      const categoria = await Categoria.create({
        titulo,
        descricao,
        imagem: req.file ? req.file.filename : null
      });

      res.json(categoria);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao criar categoria' });
    }
  },

  // Listar categorias (PUBLICO)
  async list(req, res) {
    const categorias = await Categoria.findAll();

    res.json(categorias);
  },

  // Buscar categoria por ID
  async show(req, res) {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.json(categoria);
  },

  // Atualizar categoria (ADMIN)
  async update(req, res) {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    const { titulo, descricao } = req.body;

    // Remove imagem antiga se enviar nova
    if (req.file && categoria.imagem) {
      const oldPath = path.resolve('src/uploads/capas', categoria.imagem);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    categoria.titulo = titulo ?? categoria.titulo;
    categoria.descricao = descricao ?? categoria.descricao;
    categoria.imagem = req.file ? req.file.filename : categoria.imagem;

    await categoria.save();

    res.json(categoria);
  },

  // Deletar categoria (ADMIN)
  async delete(req, res) {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    // Remove imagem
    if (categoria.imagem) {
      const imgPath = path.resolve('src/uploads/capas', categoria.imagem);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await categoria.destroy();
    res.json({ sucesso: true });
  }
};
