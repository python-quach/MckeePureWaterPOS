import React from 'react';
import { Form, Message, Divider } from 'semantic-ui-react';

export const DebugMessage = (props) => (
    <Form.Group>
        <Divider hidden />
        <Message>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Message>
    </Form.Group>
);
