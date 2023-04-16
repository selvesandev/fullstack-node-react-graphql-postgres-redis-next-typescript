// import React from 'react';
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {

  return (
    <Wrapper>
    <Formik initialValues={{ username: "" }} onSubmit={() => {}}>
      {({isSubmitting}) => {
        return (
          <Form>
            <InputField placeholder="Usernane" name="username" label="Username"/>
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
