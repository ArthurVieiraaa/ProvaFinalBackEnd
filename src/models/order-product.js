const database = require('../config/database');
const Product = require('./product');
const Order = require('./order');

class OrderProduct {
    constructor() {
        this.model = database.db.define('order_products', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            quantity: {
                type: database.db.Sequelize.INTEGER,
                allowNull: false
            }
        });

        this.model.belongsTo(Order, { foreignKey: 'orderId' });
        this.model.belongsTo(Product, { foreignKey: 'productId' });
    }
}

module.exports = new OrderProduct().model;