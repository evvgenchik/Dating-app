import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:activationLink', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

export default router;
