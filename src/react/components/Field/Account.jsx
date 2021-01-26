import React from 'react';
import { Form } from 'semantic-ui-react';

const Account = (props) => {
    return (
        <Form.Input
            {...props.input}
            className='BuyAccount'
            id='account'
            label='Account'
            placeholder='xxxxxxxxxx'
            inverted={true}
            icon='hashtag'
            iconPosition='left'
            width={2}
        />
    );
};

export default Account;
