const { Router } = require("express");
const likeController = require("../controllers/like.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const likeRouter = Router();

likeRouter.post(
    '/',
    authMiddleware,
    likeController.like
);
likeRouter.get(
    '/:id',
    likeController.getLikeByPostId
);

module.exports = likeRouter;