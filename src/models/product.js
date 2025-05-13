const database = require("../config/database");
const Category = require("../models/category");

class Product {
    constructor() {
        this.model = database.db.define('products', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            price: {
                type: database.db.Sequelize.FLOAT
            }
        });
        this.model.belongsTo(Category, { foreignKey: 'idCategory' });
    }
}

module.exports = new Product().model;