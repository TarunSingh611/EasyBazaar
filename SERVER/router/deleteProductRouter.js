const express = require('express');
const router = express.Router();
const deleteProductController = require('./../controllers/deleteProductController');




// POST /cartItems
router.post('/', deleteProductController.postDeleteProduct);

module.exports = router;