import {Router} from "express";
import {asyncHandler} from "../utils/handlers/index.js";
import {upload, validate, verifyToken} from "../app/middleware/index.js";
import * as authRequest from "../app/requests/AuthRequest.js";
import * as authController from "../app/controllers/AuthController.js";

const router = Router();

router.post(
    "/register",
    asyncHandler(validate(authRequest.register)),
    asyncHandler(authController.register)
);
router.post(
    "/login",
    asyncHandler(validate(authRequest.login)),
    asyncHandler(authController.login)
);
router.post(
    "/logout",
    asyncHandler(verifyToken),
    asyncHandler(authController.logout)
);
router.get(
    "/me",
    asyncHandler(verifyToken),
    asyncHandler(authController.me)
);
router.put(
    "/update-profile",
    asyncHandler(verifyToken),
    asyncHandler(upload),
    asyncHandler(validate(authRequest.updateMe)),
    asyncHandler(authController.updateMe)
);
router.patch(
    "/change-password",
    asyncHandler(verifyToken),
    asyncHandler(validate(authRequest.changePassword)),
    asyncHandler(authController.changePassword)
);

export default router;
