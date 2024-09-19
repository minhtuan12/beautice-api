import {config as loadEnv} from "dotenv";
import mongoose, {set} from "mongoose";
import logger from "./Logger.js";

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

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MESUREMENT_ID
};
