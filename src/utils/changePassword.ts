import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../entity/User";
import {forgotPasswordPrefix} from "../constants/redisPrefixes";
import {redis} from "../redis";
import * as bcrypt from "bcryptjs";
import {ChangePasswordInput} from "../types/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {

    @Mutation(() => User, { nullable: true})

    async changePassword(@Arg("data") {token, password}: ChangePasswordInput): Promise<User | null>{

        console.log("get token: " + token);
        console.log("get new password");
        const userId = await redis.get(forgotPasswordPrefix + token);
        if(!userId){
            return null;
        }

        const user = await User.findOne(userId);

        if (!user){
            return null;
        }

        user.password = await bcrypt.hash(password, 12);

        await user.save();

        console.log("already changed new password");
        return user;
    }
}