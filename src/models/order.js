const database = require("../config/database");
const User = require("../models/user");
const Product = require("../models/product");

class Order {
    constructor() {
        this.model = database.db.define('orders', {
            idOrder: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idUser: {
                type: database.db.Sequelize.INTEGER,
                allowNull: false,
            },
            total: {
                type: database.db.Sequelize.DECIMAL(10, 2),
                allowNull: false,
            }
        });
        this.model.belongsTo(User, { foreignKey: 'idUser' });
        this.model.belongsToMany(Product, { through: 'OrderProduct', foreignKey: 'idOrder' });
    }
}

module.exports = Order;