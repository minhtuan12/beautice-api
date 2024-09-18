import path from "path";
import short from "short-uuid";
import {config as loadEnv} from "dotenv";

loadEnv()

export const SOURCE_DIR = path.dirname(__dirname);
export const PUBLIC_DIR = path.join(path.dirname(SOURCE_DIR), "public");
export const STORAGE_DIR = path.join(SOURCE_DIR, "storage");
export const LOG_DIR = path.join(STORAGE_DIR, "logs");
export const UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads");
export const SALT_ROUNDS = 10;
export const MAX_STRING_SIZE = 255;
export const PER_PAGE = 24;

export const UUID_TRANSLATOR = short();

export const JOI_DEFAULT_MESSAGE = {
    // string
    "string.base": "Data type of {#label} is not correct",
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be more than {#limit} characters",
    "string.max": "{#label} must be less than {#limit} characters",
    "string.pattern.base": "{#label} is not in the correct format",
    "string.email": "{#label} is not in the correct format",
    "string.password": "{#label} must contain at least 8 characters, uppercase and lowercase, numbers and special characters",
    "string.passwordNotMatch": "{#label} is not correct",

    // number
    "number.base": "Data type of {#label} is not correct",
    "number.integer": "{#label} must be an integer",
    "number.min": "{#label} must be more than or equals {#limit}",
    "number.max": "{#label} must be less than or equals {#limit}",

    // array
    "array.base": "Data type of {#label} is not correct",
    "array.unique": "All elements in {#label} must be unique",
    "array.min": "{#label} must be more than or equals {#limit} elements",
    "array.max": "{#label} must be less than or equals {#limit} elements",
    "array.length": "{#label} must have {#limit} elements",
    "array.includesRequiredUnknowns": "{#label} is invalid",
    "array.includesRequiredKnowns": "{#label} is invalid",

    // object
    "object.base": "Data type of {#label} is not correct",
    "object.unknown": "Field {#label} is unknown",

    // any
    "any.only": "{#label} must be one of {#valids}",
    "any.required": "{#label} is required",
    "any.unknown": "Field {#label} is unknown",
    "any.invalid": "{#label} is invalid",
    "any.exists": "{#label} already exists",
};

export const JOI_DEFAULT_OPTIONS = {
    abortEarly: false,
    errors: {
        wrap: {label: false},
        language: {"any.exists": "any.exists"},
    },
    externals: false,
};

export const VALIDATE_PHONE_REGEX = /^(0[235789])[0-9]{8}$/;
export const VALIDATE_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[^\s]{8,50}$/
export const VALIDATE_EMAIL_REGEX =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const AVATAR_LINK = `${process.env.SERVER_DOMAIN}/uploads/`
