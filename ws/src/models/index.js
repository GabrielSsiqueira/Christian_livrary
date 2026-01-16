// models/index.js
const sequelize = require('../config/database');

const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Livro = require('./Livro');
const Compra = require('./Compra');
const ItemCompra = require('./ItemCompra');
const Biblioteca = require('./Biblioteca');

Compra.hasMany(ItemCompra, { foreignKey: 'compra_id' });
ItemCompra.belongsTo(Livro, { foreignKey: 'livro_id' });

Usuario.hasMany(Biblioteca, { foreignKey: 'user_id' });
Livro.hasMany(Biblioteca, { foreignKey: 'livro_id' });

module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Livro,
  Compra,
  ItemCompra,
  Biblioteca
};
