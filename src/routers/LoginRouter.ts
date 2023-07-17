import express from 'express';
import LoginController from '../controllers/LoginController';

const loginRouter = express.Router();
const controller = new LoginController();

loginRouter.post('/login', controller.login);

export default loginRouter;
