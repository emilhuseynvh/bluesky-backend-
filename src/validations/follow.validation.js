const Joi = require("joi");

const follow = Joi.object({
    followerId: Joi.string().required().trim(),
    accepted: Joi.boolean().default(false)
})

const handleFollow = Joi.object({
    followerId: Joi.string().required().trim(),
    followingId: Joi.string().required().trim(),
    status: Joi.boolean().required()
})

const followValidation = {
    follow,
    handleFollow
}

module.exports = followValidation;