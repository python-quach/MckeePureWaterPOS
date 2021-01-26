import React from 'react';
import { Form } from 'semantic-ui-react';

const Fee = (props) => {
    const { added } = props;
    return (
        <Form.Input
            {...props.input}
            id='renew'
            // name='renewalFee'
            readOnly={added}
            disabled={added}
            label='Fee'
            className='AreaCode'
            inverted={true}
            width={1}
        />
    );
};

export default Fee;
