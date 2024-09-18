import {config as loadEnv} from "dotenv";
import mongoose, {set} from "mongoose";
import logger from "./Logger";

loadEnv();

export async function connect(debug = false) {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.info("Database - Connect successfully !!!");
        set("debug", debug);
    } catch (error) {
        console.error("Database - Connect failure!!!");
        logger.error(`${error}`);
    }
}
