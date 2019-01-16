import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema, formatArgumentValidationError} from 'type-graphql';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { RegisterResolver } from "../src/models/user/Register";
//import  session from "express-session"; 
import * as session from "express-session";
import  * as connectRedis from "connect-redis";
import { redis } from "./redis";
import * as cors from "cors";
import { LoginResolver } from "./models/user/Login";
const RedisStore = connectRedis(session);
const main = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver],
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
    const app = Express();
    app.use(
        cors({
            credentials: true,
            origin: "http://loclhost:3000"
        })
    );
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