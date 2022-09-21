import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;
const Signup = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>loading ...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
        <h1>SignUp</h1>
        <Formik
        initialValues={initialValues},
        validationSchema = {validationSchema},
        onSubmit = {async (values, {setSubmitting}) => {
            setSubmitting(true)
            const response = await signup(
                {
                    variables: values
                }
            )
            localStorage.setItem("token", response.data.signup.token)
            setSubmitting(false)
            history.push('/users')
        }}
        >

        <Form>
            <Field name = 'email' type = "text" placeholder = "Email"/>
            <ErrorMessage name = "email" component={'div'}/>

            <Field name = 'name' type = "text" placeholder = "Name"/>
            <ErrorMessage name = "name" component={'div'}/>

            <Field name = 'password' type = "text" placeholder = "Password"/>
            <ErrorMessage name = "password" component={'div'}/>

            <Field name = 'confirmPassword' type = "text" placeholder = "Confirm Password"/>
            <ErrorMessage name = 'confirmPassword' component={'div'}/>

            <button type = 'submit'>Signup</button>
        </Form>
        </Formik>
    </div>
  );
};
export default Signup;
