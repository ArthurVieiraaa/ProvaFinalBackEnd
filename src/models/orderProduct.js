const { Sequelize } = require("sequelize");
const database = require("../config/database");

const OrderProduct = database.db.define("orderProducts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "orders",
      key: "id",
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: "orderProducts",
  timestamps: true,
});

module.exports = OrderProduct;