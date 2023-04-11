import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Category } from "./entities/Category";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    dbName: 'js_fullstack',
    allowGlobalContext: true,
    entities: [Category],
    user: 'postgres',
    debug: process.env.NODE_ENV !== 'production',
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
