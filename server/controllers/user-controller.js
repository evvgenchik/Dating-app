import userService from '../service/user-service.js';
import UserService from '../service/user-service.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAhe: '30 *24*60*60*1000',
        httponly: true,
      });
      return res.json(userData);
    } catch (error) {
      res.send(error); //for delete
      console.log(error);
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {}
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async activate(req, res, next) {
    try {
      const { activationLink } = req.params;
      await userService.activateAcc(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
  async getUsers(req, res, next) {
    try {
      res.json(['vbsdf']);
    } catch (error) {}
  }
}

export default new UserController();
