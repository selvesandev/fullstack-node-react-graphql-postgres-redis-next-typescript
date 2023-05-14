import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "./../entities/User";
import argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { sendRefreshToken } from "../utils/jwtToken";

@InputType()
class EmailPasswordInput {
    @Field()
    email: string;
    @Field()
    password: string;
}


@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}


@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@ObjectType()
class LoginResponse {
    @Field(() => String, { nullable: true })
    accessToken?: String
    @Field(() => String, { nullable: true })
    refreshToken?: String
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: EmailPasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if (options.email.length < 3) {
            return {
                error: [
                    {
                        field: 'email',
                        message: 'email is a requried field and must be a valid email address'
                    }
                ]
            }
        }

        const existingUser = await em.findOne(User, { email: options.email })
        if (existingUser)
            return {
                error: [
                    {
                        field: 'email',
                        message: 'This email is already registered'
                    }
                ]
            }

        try {
            const user = em.create(User, {
                email: options.email,
                password: await argon2.hash(options.password)
            });
            await em.persistAndFlush(user);
            return {
                user
            }
        } catch {
            return {
                error: [
                    {
                        field: 'email',
                        message: 'something is wrong in the server'
                    }
                ]
            }
        }
    }


    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser(
        @Arg('userId', () => Int) userId: number,
        @Ctx() { em }: MyContext
    ) {
        const user = await em.findOne(User, { id: userId });
        if (!user) return false;
        user.tokenVersion = user.tokenVersion! + 1
        await em.persistAndFlush(user);

        return true;
    }

    @Query(() => UserResponse, { nullable: true })
    @UseMiddleware(AuthMiddleware)
    async me(
        @Ctx() { payload, em }: MyContext
    ) {
        if (!payload?.userId) {
            return {
                error: [
                    {
                        field: 'auth',
                        message: 'Unauthenticated'
                    }
                ]
            };
        }

        const user = await em.findOne(User, { id: parseInt(payload.userId) })
        return {
            user
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('options') options: EmailPasswordInput,
        @Ctx() { em, res }: MyContext
    ): Promise<LoginResponse> {
        const user = await em.findOne(User, {
            email: options.email
        });
        if (!user) return {
            error: [
                {
                    field: 'password',
                    message: 'email or password does not match'
                }
            ]
        }

        const isPasswordValid = await argon2.verify(user.password, options.password);
        if (!isPasswordValid) {
            return {
                error: [
                    {
                        field: 'password',
                        message: 'email or password does not match'
                    }
                ]
            }
        }

        const jrt = sendRefreshToken(res, { userId: user.id, tokenVersion: user.tokenVersion })
        const jat = sign({ userId: user.id }, (process.env.JWT_ACCESS_TOKEN || 'secret_acc'), { expiresIn: '15m' });
        res.cookie('jat', jat, {
            httpOnly: false,
            expires: new Date(Date.now() + (7 * 24 * 3600 * 1000))
        })
        return {
            accessToken: jat,
            refreshToken: jrt
        }
    }
}
