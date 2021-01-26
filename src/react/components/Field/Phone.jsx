import React from 'react';
import { Form } from 'semantic-ui-react';

const Phone = (props) => {
    const { added } = props;
    return (
        <Form.Input
            {...props.input}
            readOnly={added}
            id='phone'
            className='PhoneNumber'
            inverted={true}
            disabled={added}
            name='phone'
            placeholder='xxx-xxxx'
            width={2}
            label='Phone Number'
        />
    );
};

export default Phone;
