/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Criar novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - idCategory
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *                 example: Smartphone Galaxy S23
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *                 example: 2999.9
 *               idCategory:
 *                 type: integer
 *                 description: ID da categoria relacionada
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro ao criar produto
 * 
 *   get:
 *     tags: [Products]
 *     summary: Listar todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erro ao buscar produtos
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Buscar produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 * 
 *   put:
 *     tags: [Products]
 *     summary: Atualizar produto
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
 *               - name
 *               - price
 *               - idCategory
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smartphone Galaxy S23
 *               price:
 *                 type: number
 *                 example: 2999.9
 *               idCategory:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar produto
 * 
 *   delete:
 *     tags: [Products]
 *     summary: Excluir produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Smartphone Galaxy S23
 *         price:
 *           type: number
 *           example: 2999.9
 *         idCategory:
 *           type: integer
 *           example: 1
 */

const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.listProducts);
router.get('/:id', ProductController.findById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;