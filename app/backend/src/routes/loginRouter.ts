import * as express from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();

loginRouter.post('/login', LoginController.login);
loginRouter.get('/login/validate', LoginController.validation);

export default loginRouter;
