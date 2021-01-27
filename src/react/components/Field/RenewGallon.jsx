import React from 'react';
import { Form } from 'semantic-ui-react';

const RenewGallon = (props) => {
    const { renewFee } = props;
    return (
        <Form.Input
            {...props.input}
            label='Gallon'
            className='AreaCode'
            disabled={!renewFee}
            inverted={true}
            width={1}
        />
    );
};

export default RenewGallon;
