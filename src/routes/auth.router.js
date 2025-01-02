const { Router } = require('express');
const validationMiddleware = require('../middlewares/validation.middleware');
const userValidation = require('../validations/user.validation');
const authController = require('../controllers/auth.controller');

const authRouter = Router();

authRouter.post(
    '/login',
    validationMiddleware(userValidation.login),
    authController.login
);
authRouter.post(
    '/register',
    validationMiddleware(userValidation.register),
    authController.register
);


module.exports = authRouter;