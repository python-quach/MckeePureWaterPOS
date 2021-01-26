import React from 'react';
import { Form } from 'semantic-ui-react';

const Date = (props) => {
    return (
        <Form.Input
            {...props.input}
            className='TodayDate'
            inverted={true}
            icon='calendar'
            placeholder='mm/dd/yyyy'
            iconPosition='left'
            readOnly
            width={2}
            label='Today Date'
        />
    );
};

export default Date;
