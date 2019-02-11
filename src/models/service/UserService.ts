import {Service} from "typedi";
import {decode} from "jsonwebtoken";

Service()
export class UserService {

    public decodeToken(token: string): number {
        const decoded: any = decode(token, {complete: true});
        return decoded.payload.user.id;
    };
}
