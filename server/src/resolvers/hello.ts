import { Query, Resolver } from "type-graphql";

@Resolver()
export class CategoryResolver {

    @Query(() => String)
    categories() {
        return 'hello';
    }

}