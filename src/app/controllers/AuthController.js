import {getToken, responseSuccess} from "../../utils/index.js";
import * as authService from "../services/AuthService.js";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../configs/Mongodb.js";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

initializeApp(firebaseConfig)
const storage = getStorage()

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
    let newAvatarUrl = null
    if (req.body.avatar) {
        const storageRef = ref(storage, `files/${req.body.avatar.originalname}`)
        const metadata = {
            contentType: req.body.avatar.mimetype
        }
        const snapshot = await uploadBytesResumable(storageRef, req.body.avatar.buffer, metadata)
        newAvatarUrl = await getDownloadURL(snapshot?.ref)
    }

    await authService.update(req.currentUser, req.body, newAvatarUrl);
    return responseSuccess(res);
}

export async function changePassword(req, res) {
    const {current_password, new_password} = req.body
    await authService.updatePassword(req.currentUser, current_password, new_password)
    return responseSuccess(res, null)
}
