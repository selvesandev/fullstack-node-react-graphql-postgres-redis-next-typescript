import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "./../entities/User";
import argon2 from "argon2";

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

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: EmailPasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
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

        return {
            user: user
        };
    }
}
