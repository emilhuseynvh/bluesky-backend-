const Like = require("../models/Like.model");
const likeService = require("../services/like.service");

const like = async (req, res, next) => {
    try {
        const result = await likeService.like(req.user._id, req.body)

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const getLikeByPostId = async (req, res, next) => {
    try {
        const like = await likeService.getLikeByPostId(req.params.id);

        res.status(200).json(like);
    } catch (err) {
        next(err);
    }
}

const likeController = {
    like,
    getLikeByPostId
}

module.exports = likeController;