const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const postValidation = require("../validations/post.validation");

const postRouter = Router();

postRouter.get(
    '/',
    postController.nestedlists
);
postRouter.get(
    '/:id',
    postController.list
);
postRouter.post(
    '/',
    authMiddleware,
    validationMiddleware(postValidation.create),
    postController.create
);
postRouter.post(
    '/:id',
    validationMiddleware(postValidation.update),
    postController.update
);
postRouter.delete(
    '/:id',
    authMiddleware,
    postController.deletePost
);

module.exports = postRouter;