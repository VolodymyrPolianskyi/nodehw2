const express = require('express');
const usersController = require('../controllers/users.controllers')
const usersRouter = express.Router();

usersRouter.post('/login',usersController.loginUser);
usersRouter.post('/register', usersController.registerUser);
module.exports = usersRouter;