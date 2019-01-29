import {verify} from "jsonwebtoken";

// import {User} from "../entity/User";

export const verifyToken =  function (token: string): boolean {
    let decoded;
    try {
        decoded = verify(token, 'shhh');
        console.log("get decode: ",JSON.stringify(decoded));
        return true
    } catch (err) {
        console.log("Smth wrong with token");
        console.log("error", err);
        return false;
}};

// export const googleStrategy = function () {
//     return new GoogleStrategy({
//         consumerKey: "",
//         consumerSecret: "",
//         callbackURL: ""
//     }, async function (token, tokenSecret, profile, done) {
//         const email = profile.email;
//         const user = await User.findOne({where: {email}})
//     })
// };