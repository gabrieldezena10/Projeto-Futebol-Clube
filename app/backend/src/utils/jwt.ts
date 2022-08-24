import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ILogin from '../interfaces/ILogin';
import CustomError from './customError';
import HTTP_STATUS from './httpStatus';

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

export default class Jwt {
  static createToken(payload: ILogin) {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);
    return token;
  }

  static validateToken(token: string | undefined) {
    try {
      if (!token) throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Token not found');
      const validToken = jwt.verify(token, SECRET);
      return validToken;
    } catch (error) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Invalid Token');
    }
  }
}
