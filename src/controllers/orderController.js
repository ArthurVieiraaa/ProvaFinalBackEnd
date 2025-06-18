const { Order, Product, User, OrderProduct } = require('../models');

class OrderController {
  static async createOrder(req, res) {
    try {
      const { total, products } = req.body;

      if (!total) {
        return res.status(400).json({ error: "O total é obrigatório" });
      }
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ error: "A lista de produtos é obrigatória" });
      }

      const userId = req.user.id;

      const order = await Order.create({
        idUser: userId,
        total,
        status: req.body.status || "pendente",
      });

      for (const p of products) {
        const product = await Product.findByPk(p.productId);

        if (!product) {
          return res
            .status(400)
            .json({ error: `Produto com ID ${p.productId} não encontrado` });
        }

        await OrderProduct.create({
          orderId: order.id,
          productId: p.productId,
          quantity: p.quantity || 1,
          price: product.price,
        });
      }

      const createdOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: Product,
            as: "products",
            through: { attributes: ["quantity", "price"] },
          },
        ],
      });

      return res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
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
      const order = await Order.findByPk(id, {
        include: [
          { model: User, as: "user", attributes: ["id", "name", "email"] },
          {
            model: Product,
            as: "products",
            through: { attributes: ["quantity", "price"] },
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar pedido" });
    }
  }

  static async updateOrder(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "O campo 'status' é obrigatório." });
    }

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      order.status = status;
      await order.save();

      const updatedOrder = await Order.findByPk(id, {
        include: [
          { model: Product, as: "products" },
          { model: User, as: "user" },
        ],
      });

      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
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
