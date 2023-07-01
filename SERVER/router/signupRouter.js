const express = require('express');
const router = express.Router();
const signupController = require('./../controllers/signupController');


// GET /cartItems
router.get('/', signupController.getSignup);

// POST /cartItems
router.post('/',  signupController.postSignup);

module.exports = router;