import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import 'dotenv/config';
// import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { TestResolver } from './resolvers/TestResolver';
import { UserResolver } from './resolvers/UserResolver';
// import RedisStore from "connect-redis";
// import session from "express-session";
import { createClient } from "redis"
import { MyContext } from './types';
let redisClient = createClient()
redisClient.connect().catch(console.error)

const db = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    // app.use(cors({
    //     origin: 'http://localhost:3000',
    //     credentials: true
    // }))
    // let redisStore = new RedisStore({
    //     client: redisClient,
    //     // prefix: "myapp:",
    // })
    // app.options('*', cors()) // include before other routes

    // app.use(
    //     session({
    //         name: 'qid',
    //         store: redisStore,
    //         cookie: {
    //             maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    //             httpOnly: true,
    //             sameSite: "lax", // csrf
    //             domain: 'http://localhost:3000'
    //             // secure: true //only https
    //         },
    //         resave: false, // required: force lightweight session keep alive (touch)
    //         saveUninitialized: false, // recommended: only save session when data exists
    //         secret: "somesecret",
    //     })
    // )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TestResolver, CategoryResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server is listening on port 4000. http://localhost:4000');
    });
};

db().catch((err) => {
    console.log(err);
});
