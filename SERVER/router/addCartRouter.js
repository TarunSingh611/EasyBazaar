const express = require('express');
const router = express.Router();
const addCartController = require('./../controllers/addCartController');

// GET /cartItems
router.post('/',  addCartController.postAddCart);



module.exports = router;