import ApiError from '../exceptions/api-error.js';
import userService from '../service/user-service.js';
import UserService from '../service/user-service.js';
import { validationResult } from 'express-validator';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation fail', errors.array()));
      }
      const { email, password } = req.body;

      const userData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAhe: '30 *24*60*60*1000',
        httponly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAhe: '30 *24*60*60*1000',
        httponly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const { activationLink } = req.params;
      await userService.activateAcc(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      res.json(['vbsdf']);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
