import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema, formatArgumentValidationError, useContainer} from 'type-graphql';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {RegisterResolver} from "../src/models/user/Register";
//import  session from "express-session";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import {redis} from "./redis";
import {LoginResolver} from "./models/user/Login";
import {ConfirmUserResolver} from "./models/user/register/ConfirmUser";
import {ForgotPasswordResolver} from "./utils/ForgotPassword";
import {ChangePasswordResolver} from "./utils/changePassword";
import {LogoutResolver} from "./models/user/Logout";
import {NoteResolver} from "./models/resolver/NoteResolver";
import {TestResolver} from "./models/resolver/TestResolver";
import {Container} from "typedi";
import * as cors from "cors";

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

    var router = Express.Router();

    const option:cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET, POST, PUT, OPTIONS, HEAD, DELETE",
        origin: "http://192.168.0.76",
        preflightContinue: false
    };
    router.use(cors());
    router.options("*", cors(option));

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
    // app.use(cors());
    // app.options('*', cors());
    // app.use(
    //     cors({
    //         credentials: true,
    //         origin: "http://192.168.0.76"
    //     })
    // );

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
        console.log('server start on localhost:4000');
    })
};

main();
