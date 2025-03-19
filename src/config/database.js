const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite" // Fichier SQLite où les données seront stockées
});

module.exports = sequelize;
