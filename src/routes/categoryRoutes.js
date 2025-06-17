/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para gerenciamento de categorias
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Criar nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Eletrônicos
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro ao criar categoria
 *   get:
 *     tags: [Categories]
 *     summary: Listar todas as categorias
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *       500:
 *         description: Erro ao buscar categorias
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Buscar categoria por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *   put:
 *     tags: [Categories]
 *     summary: Atualizar categoria
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
 *               name:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Eletrodomésticos
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar categoria
 *   delete:
 *     tags: [Categories]
 *     summary: Excluir categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso
 *       404:
 *         description: Categoria não encontrada
 */

const express = require('express');
const CategoryController = require('../controllers/categoryController');
const router = express.Router();
const isAtuthenticated = require('../middlewares/auth');

router.use(isAtuthenticated); 

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.listCategory);
router.get('/:id', CategoryController.findById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;