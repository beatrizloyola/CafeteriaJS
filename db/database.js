const Sequelize = require("sequelize");

const connection = new Sequelize('cafeteriajs', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;