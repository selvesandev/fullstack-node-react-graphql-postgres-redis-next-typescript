import { MyContext } from "src/types";
import { Category } from "./../entities/Category";
import { Ctx, Query, Resolver } from "type-graphql";


@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    categories(
        @Ctx() { em }: MyContext
    ): Promise<Category[]> {
        return em.find(Category, {})
    }
}