const Order = require("./order");
const Product = require("./product");
const User = require("./user");
const OrderProduct = require("./orderProduct");
const Category = require("./category"); // Importação da Categoria é essencial

// --- Associações existentes ---
Order.belongsTo(User, { foreignKey: "idUser", as: "user" });
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId", otherKey: "productId", as: "products" });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "productId", otherKey: "orderId", as: "orders" });

// --- ASSOCIAÇÕES ADICIONADAS E CORRIGIDAS ---

// Um Produto PERTENCE A UMA Categoria
Product.belongsTo(Category, {
  foreignKey: 'idCategory',
  as: 'category'
});

// Uma Categoria TEM MUITOS Produtos
Category.hasMany(Product, {
  foreignKey: 'idCategory',
  as: 'products'
});