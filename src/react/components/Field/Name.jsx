import React from 'react';
import { Form } from 'semantic-ui-react';

const Name = (props) => {
    const { added, label, id } = props;
    return (
        <Form.Input
            {...props.input}
            readOnly={added}
            disabled={added}
            id={id}
            inverted={true}
            className='PhoneNumber'
            placeholder='Enter Name'
            width={2}
            label={label}
        />
    );
};

export default Name;
