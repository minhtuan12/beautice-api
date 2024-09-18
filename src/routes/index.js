import authRouter from "./auth.js";

export default function route(app) {
    app.use("/api/public/auth", authRouter);
}
