import ILogin from '../interfaces/ILogin';
import Jwt from '../utils/jwt';
import UserModel from '../database/models/User';
import CustomError from '../utils/customError';
import HTTP_STATUS from '../utils/httpStatus';
import HandlePassword from '../utils/bcrypt';

export default class LoginService {
  static async Login(login: ILogin) {
    if (!login.email || !login.password) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, 'All fields must be filled');
    }

    const registeredUser = await UserModel.findOne({ where: { email: login.email } });

    if (!registeredUser) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Incorrect email or password');
    }
    HandlePassword.checkPassword(login.password, registeredUser.password);
    const token = Jwt.createToken(login);
    return token;
  }

  static async Validation(token: string | undefined) {
    if (!token) throw new CustomError(400, 'Token not found');
    const user = await Jwt.validateToken(token) as ILogin;
    const findUser = await UserModel.findOne({ where: { email: user.email } }) as UserModel;
    return findUser.role;
  }
}
