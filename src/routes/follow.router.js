const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const followController = require('../controllers/follow.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const followValidation = require('../validations/follow.validation');

const followRouter = Router();

followRouter.post(
    '/',
    validationMiddleware(followValidation.follow),
    authMiddleware,
    followController.follow);
followRouter.get(
    '/followers',
    authMiddleware,
    followController.getFollowers
);
followRouter.get(
    '/followings',
    authMiddleware,
    followController.getFollowings
);
followRouter.post(
    '/handle',
    validationMiddleware(followValidation.handleFollow),
    authMiddleware,
    followController.handleFollow
)


module.exports = followRouter;