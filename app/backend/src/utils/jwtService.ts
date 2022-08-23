import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ILogin from '../interfaces/ILogin';

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
}
