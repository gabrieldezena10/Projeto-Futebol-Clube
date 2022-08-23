import { Request, Response } from 'express';
import HTTP_STATUS from '../utils/httpStatus';
import LoginService from '../services/loginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const loginInfo = req.body;
    const token = await LoginService.Login(loginInfo);
    return res.status(HTTP_STATUS.OK).json({ token });
  }
}
