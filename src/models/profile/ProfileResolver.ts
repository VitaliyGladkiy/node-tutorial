import {Arg, Mutation, Resolver} from "type-graphql";
import {createWriteStream} from "fs";
import {Upload} from "../../types/Upload"
import * as GraphQLUpload from "graphql-upload"
@Resolver()
export class ProfilePictureResilver {
    @Mutation(() => Boolean)
    async addProfilePicture(@Arg("picture", () => GraphQLUpload) {
        createReadStream,
        filename
    }: Upload): Promise<boolean> {
        return new Promise (async (resolve, reject) =>
        createReadStream()
            .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
            .on("finish", () => resolve(true))
            .on("error", () => reject(false)))
    }
}