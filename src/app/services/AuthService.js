import NodeCache from "node-cache";
import moment from "moment";
import jwt from "jsonwebtoken";
import {User} from "../models/index.js";
import {comparePassword, generatePassword, generateToken, responseError} from "../../utils/index.js";

export const tokenBlockList = new NodeCache({
    checkperiod: process.env.TIME_TO_CHECK_PERIOD,
});

export function authToken(user_id) {
    console.log(user_id)
    const expire_in = process.env.JWT_EXPIRES_IN;
    const token = generateToken({user_id}, expire_in);
    return {
        token,
        expire_in,
        auth_type: "Bearer Token",
    };
}

export async function register({full_name, password, phone}) {
    const user = new User({
        full_name: full_name.trim(),
        password: generatePassword(password),
        phone: phone.trim(),
        avatar: null
    });

    return await user.save();
}

export async function login(req, res) {
    const {phone, password} = req.body
    const user = await User.findOne({phone: phone})
    if (!user) {
        throw responseError(res, 404, 'User not found')
    }
    if (!comparePassword(password, user.password)) {
        throw responseError(res, 401, 'Incorrect phone number or password')
    }

    req.currentUser = user
    return authToken(String(user._id))
}

export function blockToken(token) {
    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp;
    const now = moment().unix();
    tokenBlockList.set(token, 1, expiresIn - now);
}

export async function profile(user_id) {
    const user = await User.findOne({_id: user_id}).select('-password -__v');
    if (user.avatar) {
        user.avatar = process.env.SERVER_DOMAIN + "/uploads/" + user.avatar;
    }
    return user;
}

export async function update(currentUser, {full_name, phone, avatar}) {
    currentUser.full_name = full_name;
    currentUser.phone = phone;
    if (avatar) {
        currentUser.avatar = avatar;
    }
    return await currentUser.save();
}

export async function updatePassword(currentUser, currentPassword, newPassword) {
    currentUser.password = generatePassword(newPassword)
    return await currentUser.save()
}
