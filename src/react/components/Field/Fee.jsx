import React from 'react';
import { Form } from 'semantic-ui-react';

const Fee = (props) => {
    return (
        <Form.Input
            {...props.input}
            id='renew'
            // name='renewalFee'
            label='Fee'
            className='AreaCode'
            inverted={true}
            width={1}
        />
    );
};

export default Fee;
