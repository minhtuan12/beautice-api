import { responseError } from "../Response.js";
export default function (req, res) {
    return responseError(
        res,
        404,
        'URL not found. If you manually enter it, please check its spelling and retry'
    );
}
