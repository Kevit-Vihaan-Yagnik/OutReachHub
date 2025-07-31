const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin');

router.post('/login',AdminController.adminLogin);

router.post('/signup',AdminController.adminSignup);

module.exports = router;