// models/Biblioteca.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Livro = require('./Livro');

const Biblioteca = sequelize.define('Biblioteca', {
  progresso: { type: DataTypes.INTEGER, defaultValue: 0 },
  pagina_atual: { type: DataTypes.INTEGER, defaultValue: 0 },
  ultima_leitura: DataTypes.DATE
});

Biblioteca.belongsTo(Usuario, { foreignKey: 'user_id' });
Biblioteca.belongsTo(Livro, { foreignKey: 'livro_id' });

module.exports = Biblioteca;
