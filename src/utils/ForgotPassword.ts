import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import {User} from "../entity/User";
import {redis} from "../redis";
import {sendEmail} from "./EmailSender";
import v4 = require("uuid/v4");
import {forgotPasswordPrefix} from "../constants/redisPrefixes";
import {AppContext} from "../types/AppContext";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() ctx: AppContext
    ): Promise<boolean>{

        const user = await User.findOne({where: {email}} );
        if (!user){
            return false
        }

        const token = v4();
        await redis.set(forgotPasswordPrefix+ token, user.id, "ex", 60 * 60)

        await sendEmail(
            email,
            `http://localhost:4000/change-password/${token}`
        )

        ctx.req.session!.userId = user.id;
        return true;
    }
}