const Post = require("../models/Post.model");
const { NotFoundError } = require("../utils/error.util");

const nestedlists = async () => {
    let list = await Post.find().populate('image').populate('user').lean();

    let result = list.filter(item => !item.parentId)
        .map(item => subPosts(list, item));

    return result;
};

const subPosts = (list, parent) => {
    let children = list.filter(item => item.parentId?.toString() === parent._id.toString())
        .map(item => subPosts(list, item));

    return {
        ...parent,
        children: children.length ? children : undefined
    }
}

const list = async (id) => {
    let post = await Post.findOne({ _id: id }).populate('image').populate('user').lean();
    let list = await Post.find().populate('image').populate('user').lean();

    if (!post) throw new NotFoundError('post is not found');

    let result = subPosts(list, post);

    return result;

}

const create = async (id, params) => {
    let checkParentElem = params.parentId ? await Post.findOne({ _id: params.parentId }) : true;
    if (!checkParentElem) throw new NotFoundError("Parent post is not found");

    let post = await (await (await Post.create({ ...params, user: id })).populate('image')).populate('user');

    await post.save();

    if (params.parentId) {
        await incrementParentCount(params.parentId);
    }

    return post;
};


const incrementParentCount = async (parentId) => {
    if (!parentId) return;

    let parentComment = await Post.findById(parentId);
    if (!parentComment) return;

    parentComment.comment = (parentComment.comment || 0) + 1;
    await parentComment.save();

    await incrementParentCount(parentComment.parentId);
};


const update = async (id, params) => {
    const result = await Post.findByIdAndUpdate(id, params, { new: true }).populate('image').populate('user');

    if (!result) throw new NotFoundError('post is not found');

    return result
}

const deletePost = async (id) => {
    let list = await Post.find().lean()

    let post = await Post.findOne({ _id: id }).lean()

    if (!post) throw new NotFoundError('post is not found');

    post = subPosts(list, post);

    let simplifedPosts = simplifyPosts(post);

    simplifedPosts.push({ ...post, children: undefined });

    let ids = simplifedPosts.map((item) => item._id);

    await Post.deleteMany({ _id: { $in: ids } });

    return simplifedPosts;
}

const simplifyPosts = (post) => {
    let result = (post.children || []).reduce((prev, item) => {
        let children = simplifyPosts(item);
        delete item.children;

        prev = [...prev, item, ...children];

        return prev;
    }, []);

    return result;
}

const postService = {
    nestedlists,
    list,
    create,
    update,
    deletePost
}

module.exports = postService;