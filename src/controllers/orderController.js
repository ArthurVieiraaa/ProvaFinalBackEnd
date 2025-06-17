const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const OrderProduct = require("../models/orderProduct");

class OrderController {
  static async createOrder(req, res) {
  try {
    const { total, status, products } = req.body;

    if (!total)
      return res.status(400).json({ error: "O total é obrigatório" });
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "A lista de produtos é obrigatória" });
    }

    const userId = req.user.id;

    const order = await Order.create({
      idUser: userId,
      total,
      status: status || "pendente",
    });

    for (const p of products) {
      const product = await Product.findByPk(p.idProduct);
      if (!product) {
        return res.status(400).json({ error: `Produto ID ${p.idProduct} não encontrado` });
      }

      await OrderProduct.create({
        idOrder: order.idOrder || order.id, // ← Correção aqui
        idProduct: p.idProduct,
        quantity: p.quantity || 1,
        price: product.price,
      });
    }

    const createdOrder = await Order.findByPk(order.idOrder || order.id, {
      include: [
        {
          model: Product,
          as: "products", // ← use 'as' se usou no belongsToMany
          through: { attributes: ["quantity", "price"] }
        }
      ]
    });

    return res.status(201).json(createdOrder);

  } catch (error) {
    return res.status(400).json({
      error: "Erro ao criar pedido",
      detalhes: error.message,
    });
  }
}
  static async listOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: User, as: "user" },
          {
            model: Product,
            as: "products",
            through: { attributes: ["quantity", "price"] },
          },
        ],
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao listar pedidos" });
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar pedido" });
    }
  }

  static async updateOrder(req, res) {
    const { id } = req.params;
    const { userId, productId } = req.body;
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      order.userId = userId;
      order.productId = productId;
      await order.save();
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar pedido" });
    }
  }

  static async deleteOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      await order.destroy();
      return res
        .status(200)
        .send({ success: true, message: "Pedido deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar pedido" });
    }
  }
}

module.exports = OrderController;
