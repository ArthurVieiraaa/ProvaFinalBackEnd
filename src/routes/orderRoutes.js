/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gerenciamento de pedidos
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Criar novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 description: Valor total do pedido
 *                 example: 149.90
 *               status:
 *                 type: string
 *                 description: Status do pedido
 *                 example: "pendente"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro ao criar pedido
 *   get:
 *     tags: [Orders]
 *     summary: Listar todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       500:
 *         description: Erro ao buscar pedidos
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Buscar pedido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *   put:
 *     tags: [Orders]
 *     summary: Atualizar pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Novo status do pedido
 *                 example: "enviado"
 *               total:
 *                 type: number
 *                 description: Valor total atualizado
 *                 example: 159.90
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar pedido
 *   delete:
 *     tags: [Orders]
 *     summary: Excluir pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido excluído com sucesso
 *       404:
 *         description: Pedido não encontrado
 */



const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
router.use(isAuthenticated); 

router.post('/', OrderController.createOrder);
router.get('/', OrderController.listOrders);
router.get('/:id', OrderController.findById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;