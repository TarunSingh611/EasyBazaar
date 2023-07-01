const express = require('express');
const router = express.Router();
const showDetailController = require('./../controllers/showDetailController');


// GET /cartItems
router.post('/',  showDetailController.postShowDetail);



module.exports =router;