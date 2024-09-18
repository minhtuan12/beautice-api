import authRouter from "./auth";

export default function route(app) {
    app.use("/api/public/auth", authRouter);
}
