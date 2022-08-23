import * as bcrypt from 'bcryptjs';
import CustomError from './customError';
import HTTP_STATUS from './httpStatus';

export default class HandlePassword {
  static encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  };

  static checkPassword = (password: string, passwordDb: string) => {
    const isMatch = bcrypt.compareSync(password, passwordDb);
    if (!isMatch) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'User does not exist or invalid password');
    }
  };
}
