import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from 'urql';
// import gql from 'graphql-tag';


interface RegisterProps {}

const REGISTER_MUTATION = `
mutation($email: String!, $password: String!) {
    register(options: { email: $email, password: $password }) {
        user {
            id
            email
        }
        error {
            field
            message
        }
    }
}`;

const Register: React.FC<RegisterProps> = () => {
    const [,registerMutation] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper>
        <Formik initialValues={{ email: "", password: "",}} onSubmit={(values) => {
            return registerMutation(values);
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
