import {Resolver, Mutation, Arg} from "type-graphql";
import * as bcrypt from "bcryptjs";
import {User} from "../../entity/User";
import {sign} from "jsonwebtoken";
// import {verifyToken} from "../../utils/Auth";
import {UserService} from "../service/UserService";

@Resolver()
export class LoginResolver {

    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => String, {nullable: true})
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
    ): Promise<String | null> {
        const user = await User.findOne({where: {email}});
        if (!user) {
            console.log('no such user');
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
        }
        console.log("user have valid password");

        // if(!user.confirmed){
        //     console.log('pass word not confirmed');
        //     return null;
        // }
        console.log('user: ', JSON.stringify(user));
        // ctx.req.session!.userId = user.id;
        // console.log(`session: ${ctx.req.session!.userId}`);

        const sekretkey = 'shhh';
        const token = sign({user}, sekretkey);
        return token;
    }

    @Mutation(() => Boolean)
    async verifyToken(@Arg("token") token: string): Promise<Boolean> {
        console.log("try verify token");
        const id = this.userService.decodeToken(token);
        if (!id) {
            console.log('get id: ', id);
            return true;
        }
        else {
            return false;
        }
    }
}