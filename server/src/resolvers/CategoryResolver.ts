import { MyContext } from "src/types";
import { Category } from "./../entities/Category";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";


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
}
