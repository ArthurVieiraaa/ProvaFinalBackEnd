const Order = require("../models/order");

class OrderController {
    static async createOrder(req, res) {
        const { idUser, products } = req.body;
        try {
            const order = await Order.create({ idUser, products });
            res.status(201).json({ message: 'Pedido criada com sucesso', order });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar pedidos', detalhes: error.message });
        }
    }

    static async listOrders(req, res) {
        try {
            const orders = await Order.findAll();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar pedidos' });
        }
    }

    static async findById(req, res) {
        const id = req.params.id;
        try {
            const order = await findOrderById(id);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar pedido' });
        }
    }

    static async updateOrder(req, res) {
        const id = req.params.id;
        const { userId, productId } = req.body;
        try {
            const order = await updateOrder(Number(id), userId, productId);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar pedido' });
        }
    }

    static async deleteOrder(req, res) {
        const id = req.params.id;
        try {
            await deleteOrder(Number(id));
            return res.status(200).send({ success: true, message: 'Pedido deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar pedido' });
        }
    }
}

module.exports = OrderController;