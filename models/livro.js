const { DataTypes } = require('sequelize');
const connection = require('../db/database');

const Livro = connection.define('Livro', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false,
  });

module.exports = Livro;