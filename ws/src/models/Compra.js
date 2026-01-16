// models/Compra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Compra = sequelize.define('Compra', {
  total: DataTypes.FLOAT,
  status: DataTypes.STRING
});

Compra.belongsTo(Usuario, { foreignKey: 'user_id' });

module.exports = Compra;
