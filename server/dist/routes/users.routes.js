import express from 'express';
import usersController from '../controllers/users.controllers.js';
const usersRouter = express.Router();
usersRouter.post('/login', usersController.loginUser);
usersRouter.post('/register', usersController.registerUser);
export default usersRouter;
