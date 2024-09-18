import {model, Schema} from "mongoose";

const userSchema = new Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: null,
        },
        avatar: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
    }
);

const User = model("User", userSchema, "users");

export default User;
