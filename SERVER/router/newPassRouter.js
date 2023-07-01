const express = require('express');
const router = express.Router();
const newPassController = require('./../controllers/newPassController');


// GET /cartItems
router.get('/',  newPassController.getNewPass);

// POST /cartItems
router.post('/',  newPassController.postNewPass);

module.exports =router;