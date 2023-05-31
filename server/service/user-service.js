import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcrypt';
import UserModel from '../models/user-model.js';
import MailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import dotenv from 'dotenv';
import ApiError from '../exceptions/api-error.js';
dotenv.config();

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest('User already exist');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activeteLink = uuidV4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activeteLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activeteLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.createToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activateAcc(activeteLink) {
    const user = await UserModel.findOne({ activeteLink });

    if (!user) {
      throw ApiError.BadRequest('Incorrect link');
    }

    user.isActivated = true;
    await user.save();
  }
}

export default new UserService();
