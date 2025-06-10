const express = require('express');
const CategoryController = require('../controllers/categoryController');
const router = express.Router;

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.listCategories);
router.get('/:id', CategoryController.findById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = Router;