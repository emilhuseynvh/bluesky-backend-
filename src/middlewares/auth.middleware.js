const User = require("../models/User.model");
const { UnauthorizationError } = require("../utils/error.util");
const { decodeToken } = require("../utils/jwt.util");

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    let token = authorization?.split(' ')[1]

    if (!authorization || !token) return next(new UnauthorizationError('unauthorization'));

    let payload = decodeToken(token);
    if (!payload?.userId) return next(new UnauthorizationError('unauthorization'));

    let user = await User.findOne({ _id: payload.userId }); 

    req.user = user;

    next();
}

module.exports = authMiddleware;