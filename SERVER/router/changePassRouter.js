const express = require('express');
const router = express.Router();
const changePassController = require('./../controllers/changePassController');

// GET /cartItems
router.get('/',  changePassController.getChangePass);

// POST /cartItems
router.post('/',  changePassController.postChangePass);

module.exports = router;