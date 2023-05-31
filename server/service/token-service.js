import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import TokenModel from '../models/token-model.js';
dotenv.config();

class TokenService {
  createToken(user) {
    const accessToken = jwt.sign(user, process.env.TOKEN_ACCESS, {
      expiresIn: '3s',
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

  async removeToken(refreshToken) {
    const prevToken = await TokenModel.deleteOne({ refreshToken });
    return prevToken;
  }

  validateToken(token, key) {
    try {
      const userData = jwt.verify(token, key);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async getToken(refreshToken) {
    const prevToken = await TokenModel.findOne({ refreshToken });
    return prevToken;
  }
}

export default new TokenService();
