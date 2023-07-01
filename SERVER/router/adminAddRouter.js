const express = require('express');
const router = express.Router();
const adminAddController = require('./../controllers/adminAddController');


// GET /cartItems
router.get('/',  adminAddController.getAdminAdd);

// POST /cartItems
router.post('/',  adminAddController.postAdminAdd);

module.exports = router;