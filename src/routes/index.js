import authRouter from "./auth";

export default function route(app) {
    app.use("/auth", authRouter);
}
