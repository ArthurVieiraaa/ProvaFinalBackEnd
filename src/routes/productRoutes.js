const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router;

router.post('/', ProductController.createProduct);
router.get('/', ProductController.listProducts);
router.get('/:id', ProductController.findById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = Router;
