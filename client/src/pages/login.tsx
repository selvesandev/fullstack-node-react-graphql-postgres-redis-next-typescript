import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [,loginMutation] = useLoginMutation();
    const router = useRouter();

  return (
    <Wrapper>
        <Formik initialValues={{ email: "", password: "",}} onSubmit={async (values,{ setErrors }) => {
            const response = await loginMutation(values);
            if(response.data?.login.error) {
                setErrors(toErrorMap(response.data.login.error));
            } else {
                router.push('/dashboard');
            }
        }}>

        {({isSubmitting}) => {
            return (
                <Form>
                    <InputField placeholder="youremail@example.com" name="email" label="Email"/>
                    <br />
                    <InputField placeholder="Password" name="password" label="Password" type="password"/>
                    <br />
                    <hr />
                    <br />
                    <Button type="submit" color="red" isLoading={isSubmitting}>Login</Button>
                </Form>
            );
        }}
        </Formik>
    </Wrapper>
  );
};

export default Login;
