import ApiError from '../exceptions/api-error.js';
import tokenService from '../service/token-service.js';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateToken(accessToken, 'access');

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    next(ApiError.UnauthorizedError());
  }
};

export default authMiddleware;
