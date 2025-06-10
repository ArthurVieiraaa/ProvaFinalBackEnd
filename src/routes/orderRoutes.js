const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router;

router.post('/', OrderController.createOrder);
router.get('/', OrderController.listOrders);
router.get('/:id', OrderController.findById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

module.exports = Router;