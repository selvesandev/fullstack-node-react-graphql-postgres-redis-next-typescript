import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { Request, Response } from "express"
import { User } from "./entities/User"

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>,
    req: Request & { user?: User },
    res: Response,
    payload?: { userId: string }
}
