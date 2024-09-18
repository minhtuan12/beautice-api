import {escapeRegExp, responseError, SOURCE_DIR} from "@/utils";
import {errorLogger} from "@/configs/Logger";

export default function errorHandler(err, req, res, next) {
    if (err instanceof Error) {
        const re = new RegExp(escapeRegExp(SOURCE_DIR) + "(.*?)" + "\\)", "g");
        const stack = err.stack.match(re);

        errorLogger.error({
            message: err.message || `${err}`,
            date: req._startTime?.format("dddd DD-MM-YYYY, HH:mm:ss"),
            type: err.name || "Error",
            req: {
                method: req.method,
                url: req.url,
                headers: req.headers,
                params: req.params,
                query: req.query,
                body: req.body,
                cookies: req.cookies,
                signedCookies: req.signedCookies,
            },
            stack: stack ? stack.map((item) => item.slice(0, -1)) : stack,
        });

        return responseError(res, 500, "Server Error");
    }
    next(err);
}
