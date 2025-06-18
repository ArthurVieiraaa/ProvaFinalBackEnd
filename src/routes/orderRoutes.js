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
 *     summary: Criar um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - total
 *               - products
 *             properties:
 *               total:
 *                 type: number
 *                 description: Valor total do pedido (pode ser recalculado no backend para segurança).
 *                 example: 132
 *               products:
 *                 type: array
 *                 description: Lista de produtos para o pedido.
 *               items:
 *                 type: object
 *                 required:
 *                   - productId
 *                   - quantity
 *               properties:
 *                 productId:
 *                   type: integer
 *                   description: O ID do produto.
 *                   example: 1
 *                 quantity:
 *                   type: integer
 *                   description: A quantidade do produto.
 *                   example: 3
 *       responses:
 *         201:
 *           description: Pedido criado com sucesso.
 *         400:
 *           description: Erro ao criar pedido (ex: produto não encontrado, dados faltando).
 *    get:
 *      tags: [Orders]
 *      summary: Listar todos os pedidos
 *      responses:
 *        200:
 *          description: Lista de pedidos retornada com sucesso.
 *        500:
 *          description: Erro ao buscar pedidos.
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
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado com sucesso.
 *       404:
 *         description: Pedido não encontrado.
 * 
 *   put:
 *     tags: [Orders]
 *     summary: Atualizar o status de um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: Novo status do pedido.
 *                 example: "enviado"
 *    responses:
 *      200:
 *        description: Pedido atualizado com sucesso.
 *      400:
 *        description: Erro ao atualizar pedido.
 *      404:
 *        description: Pedido não encontrado.
 *   delete:
 *     tags: [Orders]
 *     summary: Excluir um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     schema:
 *       type: integer
 *  responses:
 *     200:
 *       description: Pedido excluído com sucesso.
 *     404:
 *       description: Pedido não encontrado.
 */
const express = require("express");
const OrderController = require("../controllers/orderController");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
router.use(isAuthenticated);

router.post("/", OrderController.createOrder);
router.get("/", OrderController.listOrders);
router.get("/:id", OrderController.findById);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
