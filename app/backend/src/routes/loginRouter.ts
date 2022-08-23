import * as express from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();

loginRouter.post('/login', LoginController.login);

export default loginRouter;
