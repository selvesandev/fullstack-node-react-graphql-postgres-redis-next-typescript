import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { TestResolver } from './resolvers/TestResolver';
import { UserResolver } from './resolvers/UserResolver';

const db = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TestResolver, CategoryResolver, UserResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server is listening on port 6000. http://localhost:6000');
    });
};

db().catch((err) => {
    console.log(err);
});
