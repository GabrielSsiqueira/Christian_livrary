'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT
      },
      autor: {
        type: Sequelize.STRING
      },
      preco: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      capa: {
        type: Sequelize.STRING
      },
      arquivo: {
        type: Sequelize.STRING
      },
      formato: {
        type: Sequelize.STRING
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categorias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Livros');
  }
};
