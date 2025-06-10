const { Order, Products, User } = require("../models/order");

class OrderController {
    async createOrder(req, res) {
        const userId = req.body.userId;
        const productId = req.body.productId;
        try {
            const order = await Order.create(userId, productId);
            return res.status(201).json({ success: true, message: 'Pedido criado com sucesso', order });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar pedido' });
        }
    }

    async listOrders(req, res) {
        try {
            const orders = await listOrders();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar pedidos' });
        }
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const order = await findOrderById(id);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar pedido' });
        }
    }

    async updateOrder(req, res) {
        const id = req.params.id;
        const { userId, productId } = req.body;
        try {
            const order = await updateOrder(Number(id), userId, productId);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar pedido' });
        }
    }

    async deleteOrder(req, res) {
        const id = req.params.id;
        try {
            await deleteOrder(Number(id));
            return res.status(200).send({ success: true, message: 'Pedido deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar pedido' });
        }
    }
}

module.exports = new OrderController();