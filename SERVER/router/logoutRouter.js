const express = require('express');
const router = express.Router();
const logoutController = require('./../controllers/logoutController');


// GET /cartItems
router.get('/',  logoutController.getLogout);



module.exports = router;