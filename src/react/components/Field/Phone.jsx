import React from 'react';
import { Form } from 'semantic-ui-react';

const Phone = (props) => {
    return (
        <Form.Input
            {...props.input}
            id='phone'
            className='PhoneNumber'
            inverted={true}
            name='phone'
            placeholder='xxx-xxxx'
            width={2}
            label='Phone Number'
        />
    );
};

export default Phone;
