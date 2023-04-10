import { Query, Resolver } from "type-graphql";

@Resolver()
export class TestResolver {
    @Query(() => String)
    index() {
        return 'test resolver';
    }
}
