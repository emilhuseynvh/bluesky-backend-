const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

const Like = model('Like', likeSchema);

module.exports = Like;