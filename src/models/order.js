const database = require("../config/database");
const User = require("../models/user");
const Product = require("../models/product");

class Order {
    constructor() {
        this.model = database.db.define('orders', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
        this.model.belongsTo(User, { foreignKey: 'idUser' });
        this.model.belongsTo(Product, { foreignKey: 'nameProduct' });
    }
}

module.exports = new Order().model;