const database = require('../config/database');

const OrderProduct = database.db.define('order-products', {
  id: {
    type: database.db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idOrder: database.db.Sequelize.INTEGER,
  idProduct: database.db.Sequelize.INTEGER,
  quantity: database.db.Sequelize.INTEGER,
  price: database.db.Sequelize.DECIMAL(10, 2)
}, {
  timestamps: true
});

module.exports = OrderProduct;
