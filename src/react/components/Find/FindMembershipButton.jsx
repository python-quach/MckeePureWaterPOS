import React from 'react';
import { Button } from 'semantic-ui-react';

function FindMembershipButton(props) {
    return (
        <Button
            content='open me'
            onClick={() => {
                console.log('click me.');
                props.setOpenModal(true);
            }}></Button>
    );
    // console.log(props);
    // const { hide } = props;
    // return !hide ? <Form.Button {...props.config} /> : null;
}

FindMembershipButton.defaultProps = {
    config: {
        // className: 'FindButton',
        circular: true,
        fluid: true,
        size: 'massive',
        icon: 'search',
        id: 'FindButton',
        // color: 'linkedin',
        primary: true,
        labelPosition: 'right',
        content: 'Find Membership X',
    },
};

export default FindMembershipButton;
