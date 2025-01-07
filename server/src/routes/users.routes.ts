import express from 'express'
import usersController from '../controllers/users.controllers.js'
import authenticateToken from '../middlewares/jwt.auth.js';
const usersRouter = express.Router();

usersRouter.post('/login',usersController.loginUser);
usersRouter.post('/register', usersController.registerUser);
usersRouter.post('/togglenotif', authenticateToken, usersController.toggleNotif)
usersRouter.post('/togglenotifChannel', authenticateToken, usersController.toggleNotifChannel)


export default usersRouter