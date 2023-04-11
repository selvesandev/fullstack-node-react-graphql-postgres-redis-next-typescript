import { MyContext } from "src/types";
import { Category } from "./../entities/Category";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    categories(
        @Ctx() { em }: MyContext
    ): Promise<Category[]> {
        return em.find(Category, {})
    }

    @Query(() => Category, { nullable: true })
    category(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Category | null> {
        return em.findOne(Category, { id });
    }

    /**
     * Mutations are for creating / updating
     */
    @Mutation(() => Category)
    async createCategory(
        @Arg('name') name: string,
        @Ctx() { em }: MyContext
    ): Promise<Category> {
        const post = em.create(Category, {
            name,
        });;
        await em.persistAndFlush(post);
        return post;
    }


    @Mutation(() => Category)
    async updateCategory(
        @Arg('id', () => Int) id: number,
        @Arg('name', () => String, { nullable: true }) name: string,
        @Ctx() { em }: MyContext
    ): Promise<Category | null> {
        const post = await em.findOne(Category, { id });
        if (!post) {
            return null;
        }
        if (name) {
            post.name = name;
            await em.persistAndFlush(post);
        }
        return post;
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Boolean> {
        await em.nativeDelete(Category, { id });
        return true;
    }
}
