// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  tipo: { type: DataTypes.STRING, defaultValue: 'cliente' },
  senha: DataTypes.STRING
});

module.exports = Usuario;
