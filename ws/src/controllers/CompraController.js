const { Compra, ItemCompra, Livro, Biblioteca } = require('../models');

module.exports = {
  async criar(req, res) {
    const { livros } = req.body; // [1,2,3]
    const user_id = req.user.id;

    const livrosDB = await Livro.findAll({
      where: { id: livros }
    });

    const total = livrosDB.reduce((s, l) => s + l.preco, 0);

    const compra = await Compra.create({
      user_id,
      total,
      status: 'pendente'
    });

    for (const livro of livrosDB) {
      await ItemCompra.create({
        compra_id: compra.id,
        livro_id: livro.id,
        preco: livro.preco
      });
    }

    res.json(compra);
  },

  async pagar(req, res) {
    const { id } = req.params;
    const compra = await Compra.findByPk(id, {
      include: ItemCompra
    });

    if (!compra) {
      return res.status(404).json({ erro: 'Compra não encontrada' });
    }

    compra.status = 'pago';
    await compra.save();

    for (const item of compra.ItemCompras) {
      await Biblioteca.findOrCreate({
        where: {
          user_id: compra.user_id,
          livro_id: item.livro_id
        }
      });
    }

    res.json({ sucesso: true });
  }
};
