import UserModel from '../models/user-model';
import { uuid } from 'uuid';
import bcrypt from 'bcrypt';
import MailService from './mail-service';
import tokenService from './token-service';

class UserService {
  async registartion(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error('User already exist');
    }

    const hashPassword = bcrypt.hash(password, 3);
    const activeteLink = uuid.v4();
    const user = UserModel.create({
      email,
      password: hashPassword,
      activeteLink,
    });

    await tokenService.createToken(user);
    await MailService.sendActivationMail(email, activeteLink);
  }
}

export default UserService;
