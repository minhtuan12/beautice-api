import jwt, {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";
import {getToken, responseError} from "../../utils";
import {tokenBlockList} from "../services/AuthService";
import { User } from "../models";

export default async function (req, res, next) {
    try {
        const token = getToken(req);

        if (token) {
            if (!tokenBlockList.has(token)) {
                const decodedData = jwt.verify(token, process.env.SECRET_KEY);
                const loggedInUser = await User.findOne({_id: decodedData.user_id})
                if (!loggedInUser) {
                    return responseError(res, 404, 'User not found')
                }
                req.currentUser = loggedInUser
                return next();
            }
        }

        return responseError(res, 401, "Access denied");
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
                return responseError(res, 401, "Auth token is expired");
            } else if (error instanceof NotBeforeError) {
                return responseError(res, 401, "Auth token is not working");
            } else {
                return responseError(res, 401, "Auth token is invalid");
            }
        }

        return next(error);
    }
}
