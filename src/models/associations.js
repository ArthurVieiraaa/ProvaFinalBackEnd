module.exports = (models, Sequelize) => {
  const { Order, Product, User, OrderProduct, Category } = models;

  Order.belongsTo(User, { foreignKey: "idUser", as: "user" });
  Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId", otherKey: "productId", as: "products" });
  
  Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "productId", otherKey: "orderId", as: "orders" });
  Product.belongsTo(Category, { foreignKey: 'idCategory', as: 'category' });

  Category.hasMany(Product, { foreignKey: 'idCategory', as: 'products' });
};