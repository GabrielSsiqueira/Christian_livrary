// models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  imagem: DataTypes.STRING
});

module.exports = Categoria;
