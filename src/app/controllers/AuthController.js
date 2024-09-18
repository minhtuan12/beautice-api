import {getToken, responseSuccess} from "../../utils/index.js";
import * as authService from "../services/AuthService.js";
import FileUpload from "../../utils/types/FileUpload.js";

export async function register(req, res) {
    const {full_name, phone, password} = req.body
    await authService.register({full_name, phone, password});
    return responseSuccess(res, null, 201)
}

export async function login(req, res) {
    const result = await authService.login(req, res);
    return responseSuccess(res, result)
}

export async function logout(req, res) {
    const token = getToken(req);
    authService.blockToken(token);
    return responseSuccess(res, null);
}

export async function me(req, res) {
    return responseSuccess(res, await authService.profile(req.currentUser._id));
}

export async function updateMe(req, res) {
    console.log(req.file)
    if (req.body.avatar) {
        if (req.currentUser.avatar) {
            FileUpload.remove(req.currentUser.avatar);
        }
        req.body.avatar = req.body.avatar.save("images");
    }

    await authService.update(req.currentUser, req.body);
    return responseSuccess(res);
}

export async function changePassword(req, res) {
    const {current_password, new_password} = req.body
    await authService.updatePassword(req.currentUser, current_password, new_password)
    return responseSuccess(res, null)
}
