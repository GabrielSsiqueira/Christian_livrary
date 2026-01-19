// models/index.js
const sequelize = require('../config/database');

const Usuario = require('./Usuario');
const Livro = require('./Livro');
const Categoria = require('./Categoria');
const Compra = require('./Compra');
const ItemCompra = require('./ItemCompra');
const Biblioteca = require('./Biblioteca');

Compra.hasMany(ItemCompra, { foreignKey: 'compra_id' });
ItemCompra.belongsTo(Livro, { foreignKey: 'livro_id' });

Usuario.hasMany(Biblioteca, { foreignKey: 'user_id' });
Livro.hasMany(Biblioteca, { foreignKey: 'livro_id' });

Livro.belongsTo(Categoria, { foreignKey: 'categoria_id' });


module.exports = {
  Categoria,
  sequelize,
  Usuario,
  Livro,
  Compra,
  ItemCompra,
  Biblioteca
};
