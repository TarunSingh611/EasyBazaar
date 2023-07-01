const express = require('express');
const router = express.Router();
const cartAuthController = require('./../controllers/cartAuthController');

// GET /cartItems
router.post('/', cartAuthController.postCartAuth);



module.exports = router;
