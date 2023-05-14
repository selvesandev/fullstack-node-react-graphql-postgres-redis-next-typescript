import NextLink from "next/link"
// import { useCategoriesQuery } from "../generated/graphql"

const Index = () => {
    // const {data} = useCategoriesQuery();

return<>
<NextLink href="/register">
   Register
</NextLink>
<NextLink href="/login">
    Login
</NextLink>
<NextLink href="/dashboard">
    Dashboard
</NextLink>
<br />
<hr />
<br />
<p>Hello world</p>

</>

}

export default Index
