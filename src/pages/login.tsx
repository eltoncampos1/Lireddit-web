import React from 'react'
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/ToErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';


  

const Login: React.FC <{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();

    return (
        <Wrapper variant="small">
            <Formik initialValues={{ usernameOrEmail: "", password: "" }} onSubmit={ async (values, {setErrors}) => {
                const response = await login(values);

                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                } else if(response.data?.login.user) {
                    // worked
                    router.push("/");
                }
            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField  name="usernameOrEmail" placeholder="username or email " label="Username or Email" />
                        <Box mt={4}>
                            <InputField  name="password" placeholder="password" label="Password"  type="password" />
                        </Box>
                        <Button w="400px" mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal" >Login</Button>
                        <Flex mt={3}>
                            <NextLink href="/forgot-password">
                                <Link margin="auto">Forgot password?</Link>
                            </NextLink>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}
export default withUrqlClient(createUrqlClient)(Login)