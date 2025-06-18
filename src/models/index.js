const database = require("../config/database");

const Category = require("./category");
const Order = require("./order");
const OrderProduct = require("./orderProduct");
const Product = require("./product");
const User =require("./user");

const models = {
  Category,
  Order,
  OrderProduct,
  Product,
  User,
};

require("./associations")(models, database.db.Sequelize);

module.exports = {
  ...models,
  database: database.db
};