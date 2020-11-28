import React from 'react';
import { Form, Message, Divider } from 'semantic-ui-react';

const LoginDebug = (props) => (
    <Form.Group>
        <Divider hidden />
        <Message>
            <Message.Header>Form data:</Message.Header>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Message>
    </Form.Group>
);

export default LoginDebug;
