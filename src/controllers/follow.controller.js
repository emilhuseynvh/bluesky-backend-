const followService = require("../services/follow.service");

const follow = async (req, res, next) => {
    try {
        const follow = await followService.follow(req.body.followerId, req.user._id);

        res.status(200).json(follow);
    } catch (err) {
        next(err);
    }
}

const getFollowers = async (req, res, next) => {
    const followers = await followService.getFollowers(req.user._id);
    res.status(200).json(followers);
}
const getFollowings = async (req, res, next) => {
    const followings = await followService.getFollowings(req.user._id);
    res.status(200).json(followings);
}

const handleFollow = async (req, res, next) => {
    try {
        const result = await followService.handleFollow(req.body.followerId, req.body.followingId, req.body.status);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const followController = {
    getFollowers,
    getFollowings,
    follow,
    handleFollow
}

module.exports = followController;