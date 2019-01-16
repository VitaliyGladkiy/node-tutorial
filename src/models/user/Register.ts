import {Resolver, Query, Mutation, Arg, Authorized} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
    
    @Authorized()
    @Query(() => String)
    async hello() {
        return "hello apoloo";
    }

    @Mutation(()=> User)
    async register( 
        @Arg("data") {email, firstName, lastName, password}: RegisterInput): Promise<User> {
            const hasedPassword = await bcrypt.hash(password, 12);
    
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hasedPassword
            }).save();

            return user;
    }
}