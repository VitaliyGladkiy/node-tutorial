import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema, formatArgumentValidationError, registerEnumType, useContainer} from 'type-graphql';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Container } from "typedi";
import { RegisterResolver } from "../src/models/user/Register";
//import  session from "express-session"; 
import * as session from "express-session";
import  * as connectRedis from "connect-redis";
import { redis } from "./redis";
import * as cors from "cors";
import { LoginResolver } from "./models/user/Login";
import {ConfirmUserResolver} from "./models/user/register/ConfirmUser";
import {ForgotPasswordResolver} from "./utils/ForgotPassword";
import {ChangePasswordResolver} from "./utils/changePassword";
import {LogoutResolver} from "./models/user/Logout";
import {NoteResolver} from "./models/resolver/NoteResolver";
import {NoteStatus} from "./types/NoteStatus";
const RedisStore = connectRedis(session);
const main = async () => {
    const schema = await buildSchema({
        resolvers: [
            LoginResolver,
            RegisterResolver,
            ConfirmUserResolver,
            ChangePasswordResolver,
            ForgotPasswordResolver,
            LogoutResolver,
            NoteResolver
        ],
        authChecker:({ context: {req}}) => {
                return !!req.session.userId;
        }
    });
    await createConnection();
    const apolloServer = new ApolloServer({
        schema, 
        formatError: formatArgumentValidationError,
        context: ({req}:any) => ({ req })
    });
    registerEnumType(NoteStatus, {
        name: "NoteStatus",
        description: "Describe note status"
    });
    const app = Express();
    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:4000"
        })
    );


    useContainer(Container);
    app.use(
        session({
        store: new RedisStore({
            client: redis as any,
        }),
        name: "qid",
        secret: "asdasd3321321",
        resave: false,
        saveUninitialized:false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "prodution",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        }
    })
    );

    apolloServer.applyMiddleware({app});
    app.listen(4000, () => {
        console.log('server stasrt on localhost:4000');
    })
};

main();