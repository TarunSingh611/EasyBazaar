
const express = require('express');
const router = express.Router();
const cartController = require('./../controllers/cartController');


// GET /cartItems
router.get('/',  cartController.getCart);

// POST /cartItems
router.post('/',  cartController.postCart);

module.exports = router;