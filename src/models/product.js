const { Sequelize } = require("sequelize");
const database = require("../config/database");

const Product = database.db.define("products", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false, // Boa prática adicionar
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false, // Boa prática adicionar
  },
  idCategory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'categories', // Nome da TABELA
      key: 'id'
    }
  }
});

module.exports = Product;