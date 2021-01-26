import React from 'react';
import { Form } from 'semantic-ui-react';

const Invoice = (props) => {
    return (
        <Form.Input
            {...props.input}
            readOnly
            label='Invoice'
            name='record_id'
            component={Form.Input}
            className='TodayDate'
            placeholder='xxxxxxx'
            inverted={true}
            icon='hashtag'
            iconPosition='left'
            width={2}
        />
    );
};

export default Invoice;
