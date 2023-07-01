const express = require('express');
const router = express.Router();
const forgotPassController = require('./../controllers/forgotPassController');


// GET /cartItems
router.get('/',  forgotPassController.getForgotPass);

// POST /cartItems
router.post('/',  forgotPassController.postForgotPass);

module.exports = router;