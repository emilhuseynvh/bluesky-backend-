const User = require("../models/User.model");
const bcrypt = require('bcrypt');

const { DublicateError, NotFoundError } = require("../utils/error.util");
const { encodePayload } = require("../utils/jwt.util");

const login = async (params) => {
    let user = await User.findOne({ username: params.username }).lean();
    if (!user) throw new NotFoundError('Username or password is wrong');

    let checkPassword = await bcrypt.compare(params.password, user.password);
    if (!checkPassword) throw new NotFoundError('Username or password is wrong');

    const token = encodePayload({ userId: user._id });

    delete user.password;

    return {
        token,
        user
    }

}

const register = async (params) => {
    let check = await User.findOne({
        $or: [
            {
                email: params.email
            },
            {
                username: params.username
            }
        ]
    })

    if (check) throw new DublicateError('User is already exists');

    let user = new User(params);

    await user.save();

    return user;
}

const authService = {
    login,
    register
};

module.exports = authService;