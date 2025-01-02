const postService = require("../services/post.service");
const { NotFoundError } = require("../utils/error.util");

const nestedlists = async (req, res, next) => {
    try {
        const result = await postService.nestedlists();

        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
}

const list = async (req, res, next) => {
    try {
        const result = await postService.list(req.params.id);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const post = await postService.create(req.user._id, req.body);

        res.status(200).json({ message: 'Post created succesfully', post });
    } catch (err) {
        next(new NotFoundError('parentId or image is not found'));
    }
}

const update = async (req, res, next) => {
    try {
        const result = await postService.update(req.params.id, req.body);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const result = await postService.deletePost(req.params.id);

        res.status(200).json({ message: "post deleted succesfully" });
    } catch (err) {
        next(err);
    }
}

const postController = {
    nestedlists,
    list,
    create,
    update,
    deletePost
}

module.exports = postController;