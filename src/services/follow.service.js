const Follow = require("../models/Follow.model");
const User = require("../models/User.model");
const { AppError } = require("../utils/error.util");
const checkRole = require("../utils/role.util");

const follow = async (followerId, followingId) => {

    if (followerId == followingId) throw new AppError('User can not follow yourself', 400);

    let follower = await User.findById(followerId);
    let following = await User.findById(followingId);

    if (!follower || !following) {
        throw new Error('User not found');
    }

    const checkFollow = await Follow.findOne({
        $and: [
            { followerId: followerId },
            { followingId: followingId }
        ]
    })


    if (checkFollow) throw new AppError('follow already exists', 400);

    const check = checkRole(follower.role);

    const follow = new Follow({ followerId: followerId, followingId: followingId, accepted: check });
    await follow.save();

    follower.followers = await Follow.countDocuments({ accepted: true, followerId: followerId });
    following.followings = await Follow.countDocuments({ accepted: true, followingId: followingId });

    await following.save()
    await follower.save()

    return follow;
}

const getFollowers = async (id) => {
    const followers = await Follow.find({
        $and: [
            { followerId: id },
            { accepted: true }
        ]
    }).populate('followingId').populate('followerId');

    return followers;
}

const getFollowings = async (id) => {
    const followings = await Follow.find({
        $and: [
            { followingId: id },
            { accepted: true }
        ]
    }).populate('followingId').populate('followerId');

    return followings
}

const handleFollow = async (followerId, followingId, status) => {

    let follow = await Follow.findOne({
        $and: [
            { followerId: followerId },
            { followingId: followingId }
        ]
    });

    if (status === false) {
        await Follow.findByIdAndDelete(follow._id);
        return { message: "Follow request deleted" };
    }

    if (!follow) throw new Error("Follow request not found");


    follow.accepted = true;

    await follow.save();

    return follow;
}



const followService = {
    follow,
    getFollowers,
    getFollowings,
    handleFollow
}

module.exports = followService;