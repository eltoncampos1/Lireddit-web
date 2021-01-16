import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

interface forgotPasswordProps {

}

const forgotPassword: React.FC <forgotPasswordProps> = ({}) => {
    const [ complete, setComplete ] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small">
        <Formik initialValues={{ email: ""}} 
        onSubmit={ async (values) => {
            await forgotPassword(values)
            setComplete(true);
        }}>
            {({ isSubmitting }) => complete ? 
                <Box>
                    if an account with email exists, we sent you an email
                </Box>
            : (
                <Form>                    
                    <InputField  name="email" placeholder="email" label="Email"  type="email" />
                    <Button w="400px" mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal" >Forgot Password</Button>
                </Form>
            )}
    </Formik>
    </Wrapper>
    );
}
export default withUrqlClient(createUrqlClient) (forgotPassword);