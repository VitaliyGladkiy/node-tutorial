import {Resolver, Mutation, Arg, Ctx} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import {AppContext} from "../../types/AppContext";
import { sign } from "jsonwebtoken";
import {verifyToken} from "../../utils/Auth";
@Resolver()
export class LoginResolver {

    @Mutation(()=> String, { nullable: true})
    async login( 
        @Arg("email") email:string,
        @Arg("password") password: string,
        @Ctx() ctx: AppContext
        ): Promise<String | null>
         {
             console.log('email:', email);
             console.log('password: ', password)
            const user = await User.findOne({where: {email}})
            console.log("find user: " + JSON.stringify(user));
            if(!user){
                console.log('no such user');
                return null;
            }

            const valid = await bcrypt.compare(password, user.password);
            if(!valid){
                return null;
            }
            console.log("user have valid password");

            // if(!user.confirmed){
            //     console.log('pass word not confirmed');
            //     return null;
            // }
            ctx.req.session!.userId = user.id;
            console.log(`session: ${ctx.req.session!.userId}`);

            const sekretkey = 'shhh';
            const token = sign({user}, sekretkey);
            console.log('get token: ',token);
            return token;
    }

    @Mutation(() => Boolean)
    async verifyToken(@Arg("token") token: string): Promise<Boolean>{
        console.log("try verify token");
        return verifyToken(token)
    }
}