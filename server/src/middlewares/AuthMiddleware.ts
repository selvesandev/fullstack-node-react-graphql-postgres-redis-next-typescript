import { verify } from "jsonwebtoken";
import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";


export const AuthMiddleware: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) return Promise.reject({
        error: [
            {
                field: 'unknown',
                message: 'Authentication failed'
            }
        ]
    });
    const token = authorization?.split(' ')[1]

    try {
        if (authorization) {
            const payload = verify(token!, process.env.JWT_ACCESS_TOKEN!);
            context.payload = payload as any;
        }
    } catch (error) {
        return Promise.reject({
            error: [
                {
                    field: 'unknown',
                    message: 'Authentication failed'
                }
            ]
        });

        // return context.res.send({
        //     error: [
        //         {
        //             field: 'unknow',
        //             message: 'Unauthenticated Failed'
        //         }
        //     ]
        // })
    }
    return next();
}
