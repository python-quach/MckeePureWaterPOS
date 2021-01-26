import React from 'react';
import { Form } from 'semantic-ui-react';

const MemberSince = (props) => {
    return (
        <Form.Input
            {...props.input}
            label='Member Since'
            readOnly
            className='TodayDate'
            inverted={true}
            placeholder='mm/dd/yyy'
            icon='calendar'
            iconPosition='left'
            width={2}
        />
    );
};

export default MemberSince;
