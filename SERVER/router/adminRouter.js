const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController');


// GET /cartItems
router.get('/',  adminController.getAdmin);

// POST /cartItems
router.post('/',  adminController.postAdmin);

module.exports = router;