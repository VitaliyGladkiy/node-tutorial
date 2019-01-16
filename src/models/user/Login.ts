import {Resolver, Mutation, Arg, Ctx} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { AppContext} from "../../types/AppContext";

@Resolver()
export class LoginResolver {

    @Mutation(()=> User, { nullable: true})
    async login( 
        @Arg("email") email:string,
        @Arg("password") password: string,
        @Ctx() ctx: AppContext
        ): Promise<User | null>
         {
        
            const user = await User.findOne({where: {email}})
            console.log("find user: " + JSON.stringify(user));
            if(!user)
                return null
            
            const valid = await bcrypt.compare(password, user.password);
            if(!valid){
                return null;
            }
            console.log("password valid");
            ctx.req.session!.userId = user.id;
            return user;
    }
}