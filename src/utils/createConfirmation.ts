import {v4} from "uuid";
import {redis} from "../../src/redis";
import {confirmationPrefix} from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: number) => {

    const token = v4();
    await redis.set(confirmationPrefix+ token, userId, "ex", 60 * 60 * 24);
    console.log("create token: " + token);
    return `http://localhost:4000/user/confirm/${token}`;
};