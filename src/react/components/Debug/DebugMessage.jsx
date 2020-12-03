import React from 'react';
import { Form, Message, Divider } from 'semantic-ui-react';

const DebugMessage = (props) => (
    <Form.Group>
        <Divider hidden />
        <Message>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Message>
    </Form.Group>
);

export default DebugMessage;
