import React from 'react';
import { Form } from 'semantic-ui-react';

const Time = (props) => {
    return (
        <Form.Input
            {...props.input}
            label='Current Time'
            className='TodayDate'
            inverted={true}
            placeholder='00:00:00 PM'
            icon='time'
            iconPosition='left'
            readOnly
            width={2}
        />
    );
};

export default Time;
