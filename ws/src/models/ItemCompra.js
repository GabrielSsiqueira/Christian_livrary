// models/ItemCompra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Compra = require('./Compra');
const Livro = require('./Livro');

const ItemCompra = sequelize.define('ItemCompra', {
  preco: DataTypes.FLOAT
});

ItemCompra.belongsTo(Compra, { foreignKey: 'compra_id' });
ItemCompra.belongsTo(Livro, { foreignKey: 'livro_id' });

module.exports = ItemCompra;
