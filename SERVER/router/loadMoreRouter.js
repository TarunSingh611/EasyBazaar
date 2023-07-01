const express = require('express');
const router = express.Router();
const loadMoreController = require('./../controllers/loadMoreController');

// GET /cartItems
router.post('/',  loadMoreController.postLoadMore);



module.exports = router;