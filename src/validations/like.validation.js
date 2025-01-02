const Joi = require("joi");

const like = Joi.object({
    productId: Joi.string().required().trim()
});

const likeValidation = {
    like
};

module.exports = likeValidation;