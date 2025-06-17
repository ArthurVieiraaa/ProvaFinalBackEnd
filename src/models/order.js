const { Sequelize } = require("sequelize");
const database = require("../config/database");

const Order = database.db.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Order;
