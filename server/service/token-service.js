import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import TokenModel from '../models/token-model.js';
dotenv.config();

class TokenService {
  createToken(user) {
    const accessToken = jwt.sign(user, process.env.TOKEN_ACCESS, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(user, process.env.TOKEN_REFRESH, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const prevToken = await TokenModel.findOne({ user: userId });

    if (prevToken) {
      prevToken.refreshToken = refreshToken;
      await prevToken.save();
    } else {
      const token = await TokenModel.create({ user: userId, refreshToken });
      return token;
    }
  }
}

export default new TokenService();
