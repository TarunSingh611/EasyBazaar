const express = require('express');
const router = express.Router();
const verifyEmailController = require('./../controllers/verifyEmailController');

// GET /verify
router.get('/', verifyEmailController.getVerifyEmail);

module.exports = router;
