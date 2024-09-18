import Joi from "joi";
import {
    comparePassword,
    isValidPassword,
    MAX_STRING_SIZE,
    VALIDATE_PASSWORD_REGEX,
    VALIDATE_PHONE_REGEX,
} from "../../utils/index.js";
import {AsyncValidate} from "../../utils/types/index.js";

import { User } from "../models/index.js";

export const register = {
    body: Joi.object({
        full_name: Joi.string()
            .trim()
            .max(MAX_STRING_SIZE)
            .required()
            .label("Full name"),
        phone: Joi.string()
            .trim()
            .pattern(VALIDATE_PHONE_REGEX)
            .required()
            .label("Phone number")
            .custom(
                (value, helpers) =>
                    new AsyncValidate(value, async function (req) {
                        const user = await User.findOne({phone: value});
                        return !user ? value : helpers.error("any.exists");
                    })
            ),
        password: Joi.string()
            .required()
            .pattern(VALIDATE_PASSWORD_REGEX)
            .custom(
                (value, helpers) =>
                    new AsyncValidate(value, async function (req) {
                        if (!isValidPassword(value)) {
                            return helpers.error("string.password");
                        }
                        return value
                    })
            )
            .label('Password')
    }),
};

export const login = {
    body: Joi.object({
        phone: Joi.string()
            .trim()
            .pattern(VALIDATE_PHONE_REGEX)
            .required()
            .label("Phone number"),
        password: Joi.string()
            .required()
            .label('Password')
    }),
};

export const updateMe = {
    body: Joi.object({
        full_name: Joi.string()
            .trim()
            .max(MAX_STRING_SIZE)
            .required()
            .label("Full name"),
        phone: Joi.string()
            .trim()
            .pattern(VALIDATE_PHONE_REGEX)
            .required()
            .label("Phone number")
            .custom(
                (value, helpers) =>
                    new AsyncValidate(value, async function (req) {
                        const user = await User.findOne({
                            phone: value,
                            _id: {$ne: req.currentUser._id},
                        });
                        return !user ? value : helpers.error("any.exists");
                    })
            ),
        avatar: Joi.alternatives().try(
            Joi.object({
                originalname: Joi.string().trim().required().label("Avatar file name"),
                mimetype: Joi.valid(
                    "image/jpeg",
                    "image/png",
                )
                    .required()
                    .label("Avatar type"),
                buffer: Joi.any()
                    .required()
                    .custom((value, helpers) =>
                        Buffer.isBuffer(value) ? value : helpers.error("any.invalid")
                    )
                    .label("Avatar data"),
            }), Joi.allow(null)
        ).label("Avatar"),
    }),
};

export const changePassword = {
    body: Joi.object({
        current_password: Joi.string().required()
            .custom((value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    if (!comparePassword(value, req.currentUser.password)) {
                        return helpers.error("string.passwordNotMatch")
                    }
                    return value
                }))
            .label('Current password'),
        new_password: Joi.string().pattern(VALIDATE_PASSWORD_REGEX).required()
            .custom(
                (value, helpers) =>
                    new AsyncValidate(value, async function (req) {
                        if (!isValidPassword(value)) {
                            return helpers.error("string.password");
                        }
                        return value
                    })
            )
            .label('New password')
    })
}
