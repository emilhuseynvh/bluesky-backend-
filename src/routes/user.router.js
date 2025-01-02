const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get(
    '/',
    authMiddleware,
    userController.list
)
userRouter.post(
    '/',
    validationMiddleware(userValidation.update),
    authMiddleware,
    userController.update
);
userRouter.delete(
    '/',
    authMiddleware,
    userController.deleteUser
);

module.exports = userRouter;