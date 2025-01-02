const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Schema.Types.Date,
        required: false,
        trim: true,
    },
    avatar: {
        type: String,
        required: false,
        ref: 'Image',
        trim: true,
    },
    badge: {
        type: String,
        required: false,
        trim: true,
    },
    bio: {
        type: String,
        required: false,
        trim: true
    },
    followers: {
        type: Number,
        required: false,
        default: 0
    },
    followings: {
        type: Number,
        required: false,
        default: 0
    },
    role: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    let hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = model('User', userSchema);

module.exports = User;