import React from 'react';
import { Form } from 'semantic-ui-react';

const renderAccountField = (field) => {
    return (
        <Form.Input
            {...field.input}
            className='BuyAccount'
            id='account'
            label='Account'
            placeholder='xxxxxx'
            inverted={true}
            icon='hashtag'
            iconPosition='left'
            width={2}
        />
    );
};

export default renderAccountField;
