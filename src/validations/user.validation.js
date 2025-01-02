const Joi = require('joi');

const register = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
    username: Joi.string().min(3).max(30).alphanum().required().messages({
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username cannot exceed 30 characters",
        "any.required": "Username is required",
    }),
    dob: Joi.date().messages({
        "date.base": "Invalid date format",
        "any.required": "Date of birth is required",
    }),
})

const login = Joi.object({
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
    username: Joi.string().min(3).max(30).required().messages({
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username cannot exceed 30 characters",
        "any.required": "Username is required",
    }),
})

const update = Joi.object({
    email: Joi.string().email().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
    username: Joi.string().min(3).max(30).alphanum().messages({
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username cannot exceed 30 characters",
        "any.required": "Username is required",
    }),
    dob: Joi.date().messages({
        "date.base": "Invalid date format",
        "any.required": "Date of birth is required",
    }),
    password: Joi.string().min(6).messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
    username: Joi.string().min(3).max(30).messages({
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username cannot exceed 30 characters",
        "any.required": "Username is required",
    }),
    avatar: Joi.string().optional(),
    badge: Joi.string().optional(),
    bio: Joi.string().max(250).messages({
        "string.max": "Bio cannot exceed 250 characters",
        "any.required": "Bio is required",
    }),
    role: Joi.string().valid('public, private').trim()
})

const userValidation = {
    login,
    register,
    update
}

module.exports = userValidation;
