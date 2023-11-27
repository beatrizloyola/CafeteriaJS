// models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Usuario = sequelize.define('Usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    autoIncrement: false,
});

module.exports = Usuario;
