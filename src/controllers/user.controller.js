const userService = require("../services/user.service");

const list = async (req, res, next) => {
    try{
        const user = await userService.list(req.user._id)

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const user = await userService.update(req.user._id, req.body);

        res.status(200).json({ message: 'User updated succesfully', user });
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.user._id);

        res.status(200).json({ message: 'User deleted succesfully' });
    } catch (err) {
        next(err);
    }
}

const userController = {
    list,
    update,
    deleteUser
};

module.exports = userController;