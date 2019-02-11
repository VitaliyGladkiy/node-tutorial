import {Resolver, Mutation, Arg} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
// import {sendEmail} from "../../utils/EmailSender";
// import {createConfirmationUrl} from "../../utils/createConfirmation";
import {Profile} from "../../entity/Profile";
import {Note} from "../../entity/Note";

@Resolver()
export class RegisterResolver {

    @Mutation(()=> User)
    async register( 
        @Arg("data") {email, firstName, lastName, password}: RegisterInput): Promise<User> {
            const hasedPassword = await bcrypt.hash(password, 12);

            const profile = new Profile();
            const note = new Note();
            profile.noteList=[note];
            await profile.save();

            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hasedPassword,
                profile: profile
            }).save();
            console.log("usr creadted. start send email");
            // await sendEmail(email, await createConfirmationUrl(user.id));
            return user;
    }
}