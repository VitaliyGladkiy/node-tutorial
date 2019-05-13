import {decode} from "jsonwebtoken";
import {Service} from "typedi";

@Service()
export class UserService {

    public decodeToken(token: string): number {
        const decoded: any = decode(token, {complete: true});
        return decoded.payload.user.id;
    };
}
