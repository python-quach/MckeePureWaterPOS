import React from 'react';
import { Form } from 'semantic-ui-react';

const RenewGallon = (props) => {
    const { added, renewFee } = props;
    return (
        <Form.Input
            {...props.input}
            readOnly={added}
            label='Gallon'
            className='AreaCode'
            disabled={!renewFee || added}
            inverted={true}
            width={1}
        />
    );
};

export default RenewGallon;
