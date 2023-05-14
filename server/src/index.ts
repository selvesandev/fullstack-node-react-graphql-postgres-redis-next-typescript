import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { TestResolver } from './resolvers/TestResolver';
import { UserResolver } from './resolvers/UserResolver';
import cookieParser from 'cookie-parser';
// import RedisStore from "connect-redis";
// import session from "express-session";
import { createClient } from "redis"
import { MyContext } from './types';
import { verify } from 'jsonwebtoken';
import { User } from './entities/User';
import { genJWTToken, sendRefreshToken, GenType } from './utils/jwtToken';
let redisClient = createClient()
redisClient.connect().catch(console.error)

const db = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    app.use(cookieParser())
    app.get('/', (_req, res) => res.send('Welcom!!! GraphQL Server'));
    app.post('/refresh-token', async (req, res) => {
        const jsonRefreshToken = req.cookies.jrt;
        if (!jsonRefreshToken) return res.send({ ok: false })
        try {
            const payload: any = verify(jsonRefreshToken, process.env.JWT_REFRESH_TOKEN!);
            const user = await orm.em.getRepository(User).findOne({ id: payload.userId });
            if (!user) return res.status(401).send({ ok: false })
            if (user.tokenVersion !== payload.tokenVersion) return res.status(401).send({ ok: false })

            sendRefreshToken(res, { userId: user.id, tokenVersion: user.tokenVersion });

            return res.send({
                ok: true,
                accessToken: genJWTToken({ userId: user.id }, GenType.access),
            })
        } catch (error) {
            return res.status(401).send({ ok: false })
        }
    })


    // let redisStore = new RedisStore({
    //     client: redisClient,jh \098709876545678654],,,       `               
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
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('server is listening on port 4000. http://localhost:4000');
    });
};

db().catch((err) => {
    console.log(err);
});
