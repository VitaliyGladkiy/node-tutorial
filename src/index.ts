import "reflect-metadata";

import {ApolloServer} from "apollo-server-express";
import Express from "express";
import {buildSchema, formatArgumentValidationError, useContainer} from 'type-graphql';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {RegisterResolver} from "./models/user/Register";
import session from "express-session";
import connectRedis from "connect-redis";
import {redis} from "./redis";
import {LoginResolver} from "./models/user/Login";
import {ConfirmUserResolver} from "./models/user/register/ConfirmUser";
import {ForgotPasswordResolver} from "./utils/ForgotPassword";
import {ChangePasswordResolver} from "./utils/changePassword";
import {LogoutResolver} from "./models/user/Logout";
import {NoteResolver} from "./models/resolver/NoteResolver";
import {TestResolver} from "./models/resolver/TestResolver";
import {Container} from "typedi";
import cors from "cors";
import {json} from "body-parser";


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
            NoteResolver,
            TestResolver
        ],
        dateScalarMode: "timestamp", // "timestamp" or "isoDate"
        authChecker:({ context: {req}}) => {
                return !!req.session.userId;
        }
    });

    const option:cors.CorsOptions = {
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus: 204,
        origin: '*',
        preflightContinue: false,
    };

    await createConnection();
    const apolloServer = new ApolloServer({
        schema,
        formatError: formatArgumentValidationError,
        context: ({req}:any) => {
            return {
                req,
                user: req.user,
            };
        }
    });

    useContainer(Container);
    const app = Express();

    app.use(cors(option));
    // app.use(
    //     session({
    //     store: new RedisStore({
    //         client: redis as any,
    //     }),
    //     name: "qid",
    //     secret: "asdasd3321321",
    //     resave: false,
    //     saveUninitialized:false,
    //     cookie: {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === "prodution",
    //         maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
    //     }
    // })
    // );

    apolloServer.applyMiddleware({app, path: '/graphql'});
    app.listen(3000, () => {
        console.log('server start on localhost:3000');
    })
};

main();
