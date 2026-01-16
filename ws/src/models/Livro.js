// models/Livro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Livro = sequelize.define('Livro', {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  autor: DataTypes.STRING,
  preco: DataTypes.FLOAT,
  capa: DataTypes.STRING,
  arquivo: DataTypes.STRING,
  formato: DataTypes.STRING
});

Livro.belongsTo(Categoria, { foreignKey: 'categoria_id' });

module.exports = Livro;
