const express = require('express');
const router = express.Router();
const cartItemsController = require('./../controllers/cartItemsController');
const chkAuth = require('./../my_modules/chkAuth');

// GET /cartItems
router.get('/', chkAuth, cartItemsController.getCartItems);

// POST /cartItems
router.post('/', chkAuth, cartItemsController.postCartItem);

module.exports = router;