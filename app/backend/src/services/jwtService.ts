import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

export class Jwt {
  static createToken(user: IUser): string {

    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const SECRET = process.env.JWT_SECRET as string;

    const token = jwt.sign({ data: user }, SECRET, jwtConfig)
    
    return token;
  }
};