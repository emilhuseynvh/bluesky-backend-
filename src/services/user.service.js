const Follow = require("../models/Follow.model");
const User = require("../models/User.model");
const { NotFoundError } = require("../utils/error.util");

const list = async (id) => {
    let user = await User.findOne({ _id: id }).populate('avatar');

    if (!user) throw new NotFoundError('User is not found');

    return user;
}

const update = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, params, { new: true }).populate('avatar').lean();

    if (!user) throw new NotFoundError('User is not found');

    delete user.password;

    return user;

}

const deleteUser = (id) => {
    const result = User.findByIdAndDelete(id);

    if (!result) throw new NotFoundError('User is not found');

    return result;
}

const userService = {
    list,
    update,
    deleteUser
};

module.exports = userService;