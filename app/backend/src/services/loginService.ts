import ILogin from "../interfaces/ILogin";
import Jwt from "../utils/jwtService";

export default class LoginService {
  static async Login(login: ILogin) {
    const token = Jwt.createToken(login);
    return token;
  }
}