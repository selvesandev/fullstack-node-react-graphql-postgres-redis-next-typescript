import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
    const [,registerMutation] = useRegisterMutation();
    const router = useRouter();
  return (
    <Wrapper>
        <Formik initialValues={{ email: "", password: "",}} onSubmit={async (values,{ setErrors }) => {
            const response = await registerMutation(values);
            if(response.data?.register.error){
                setErrors(toErrorMap(response.data.register.error));
            } else {
                router.push('/');
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
                    <Button type="submit" color="red" isLoading={isSubmitting}>Register</Button>
                </Form>
            );
        }}
        </Formik>
    </Wrapper>
  );
};

export default Register;
