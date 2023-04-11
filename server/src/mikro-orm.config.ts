import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Category } from "./entities/Category";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    dbName: 'js_fullstack',
    allowGlobalContext: true,
    entities: [Category, User],
    user: 'postgres',
    debug: process.env.NODE_ENV !== 'production',
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
