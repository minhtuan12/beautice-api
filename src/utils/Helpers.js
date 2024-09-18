import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {SALT_ROUNDS, VALIDATE_PASSWORD_REGEX} from "./Constants.js";
import NodeCache from "node-cache";

export function generatePassword(password) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}

export function comparePassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}

export function generateToken(data, expiresIn, secretKey) {
    return jwt.sign(data, secretKey ? secretKey : process.env.SECRET_KEY, {
        ...(expiresIn ? {expiresIn} : {}),
    });
}

export function getToken(req) {
    const token = req.headers["authorization"];
    if (!token) return undefined;
    const match = token.match(/Bearer\s*(.+)/);
    return match ? match[1] : undefined;
}

export function responseTime(time = 0) {
    const millisecond = 1000;
    if (time < millisecond) {
        return `${time} ms`;
    }

    const second = millisecond * 60;
    if (time < second) {
        return `${(time / millisecond).toFixed(2)} s`;
    }

    const minute = second * 60;
    if (time < minute) {
        return `${(time / second).toFixed(2)} m`;
    }

    return `${(time / minute).toFixed(2)} h`;
}

export function escapeRegExp(input = "") {
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function contentLength(buffer = new Buffer()) {
    let result = Buffer.byteLength(buffer);
    const b = 1024;
    if (result < b) {
        return `${result} B`;
    }

    const kb = Math.pow(b, 2);
    if (result < kb) {
        return `${(result / b).toFixed(2)} KB`;
    }

    const mb = Math.pow(kb, 2);
    if (result < mb) {
        return `${(result / kb).toFixed(2)} MB`;
    }

    return `${(result / mb).toFixed(2)} GB`;
}

export function generateURL(url = "", params = {}) {
    url = url.split("/");
    url = url.map(function (item) {
        if (item.startsWith(":")) {
            const key = item.substring(1);
            if (key in params) {
                item = params[key];
                delete params[key];
            }
        }
        return item;
    });
    url = url.join("/");
    const keyParams = Object.keys(params);
    if (keyParams.length > 0) {
        url += "?" + keyParams.map((key) => `${key}=${params[key]}`).join("&");
    }
    return url;
}

export const isValidPassword = (password) => {
    return password && new RegExp(VALIDATE_PASSWORD_REGEX).test(password)
}

export const tokenUsed = new NodeCache({checkperiod: process.env.TIME_TO_CHECK_PERIOD});
