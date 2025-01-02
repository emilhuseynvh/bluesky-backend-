const { Router } = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const uploadRouter = require('./upload.router');
const followRouter = require('./follow.router');
const postRouter = require('./post.router');
const likeRouter = require('./like.router');

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/follow', followRouter);
router.use('/post', postRouter);
router.use('/like', likeRouter);

module.exports = router;