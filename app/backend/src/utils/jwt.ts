import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ILogin from '../interfaces/ILogin';
import CustomError from './customError';
import HTTP_STATUS from './httpStatus';

dotenv.config();

export default class Jwt {
  static createToken(user: ILogin): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const SECRET = process.env.JWT_SECRET as string;

    const token = jwt.sign({ data: user }, SECRET, jwtConfig);
    return token;
  }

  static async validateToken(token: string | undefined) {
    try {
      if (!token) throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Token not found');
      const validToken = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return validToken;
    } catch (error) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Invalid Token');
    }
  }
}
