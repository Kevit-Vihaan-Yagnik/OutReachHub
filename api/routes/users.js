const express = require('express')
const router = express.Router();
const auth = require('../auth');
const UserController = require('../controller/users');

router.post('/signup' , UserController.userSignup);

router.post('/login', UserController.userLogin);

router.delete('/:userId' , UserController.userDelete);

module.exports = router;