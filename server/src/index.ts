import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';

const db = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
};

db().catch((err) => {
    console.log(err);
});