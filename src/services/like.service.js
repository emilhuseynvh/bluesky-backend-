const Like = require("../models/Like.model");
const { Types } = require('mongoose');
const Post = require("../models/Post.model");
const { DublicateError, NotFoundError } = require("../utils/error.util");

const like = async (id, params) => {

    const checkLike = await Like.findOne({
        user: id,
        productId: params.productId
    });

    console.log(checkLike);



    if (checkLike) {
        const result = await Like.findOneAndDelete({ _id: checkLike._id });
        console.log(result);

        await Post.findByIdAndUpdate(params.productId, { $inc: { like: -1 } });
        return { message: "like deleted succesfully" };
    }

    const like = await Like.create({ user: id, productId: params.productId });
    await like.populate('user');
    await like.populate('productId');

    await like.save();

    await Post.findByIdAndUpdate(params.productId, { $inc: { like: 1 } });

    return like;
};

const getLikeByPostId = async (postId) => {
    let like = await Like.find({ productId: postId }).populate('user');

    if (!like) throw new NotFoundError('like is not defined');

    return like
}

const likeService = {
    like,
    getLikeByPostId
};

module.exports = likeService;