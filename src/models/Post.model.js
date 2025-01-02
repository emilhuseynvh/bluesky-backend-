const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: false,
        default: undefined
    },
    comment: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Post = model('Post', postSchema);

module.exports = Post;