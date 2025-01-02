const jwt = require('jsonwebtoken');
const config = require('../config');

const encodePayload = (payload) => {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

    return token;

}

const decodeToken = (token) => {
    try {
        let decoded = jwt.verify(token, config.jwtSecret);
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = {
    encodePayload,
    decodeToken
}