const Joi = require("joi");

const create = Joi.object({
    image: Joi.string().optional(),
    content: Joi.string().min(2).trim().required(),
    parentId: Joi.string().optional(),
})

const update = Joi.object({
    content: Joi.string().min(5).trim().optional(),
}).concat(create);



const postValidation = {
    create,
    update
}

module.exports = postValidation;