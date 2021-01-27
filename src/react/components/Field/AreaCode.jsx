import React from 'react';
import { Form } from 'semantic-ui-react';

const AreaCode = (props) => {
    // const { error } = props;
    return (
        <Form.Input
            {...props.input}
            id='areaCode'
            className='AreaCode'
            inverted={true}
            placeholder='xxx'
            label='Area Code'
            width={1}
            // error={error ? '3 digit' : false}
            // error={error ? true : false}
        />
    );
};

export default AreaCode;
