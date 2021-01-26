import React from 'react';
import { Form } from 'semantic-ui-react';

const AreaCode = (props) => {
    const { added } = props;
    return (
        <Form.Input
            {...props.input}
            id='areaCode'
            className='AreaCode'
            inverted={true}
            placeholder='xxx'
            label='Area Code'
            disabled={added}
            readOnly={added}
            width={1}
        />
    );
};

export default AreaCode;
