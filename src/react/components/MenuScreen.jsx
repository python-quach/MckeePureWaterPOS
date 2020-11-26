import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

const MenuScreen = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Modal
            style={{ marginLeft: '30px' }}
            basic
            size='fullscreen'
            dimmer='blurring'
            closeOnDimmerClick={false}
            closeOnEscape={false}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Form.Button
                    circular
                    fluid
                    size='massive'
                    icon='sign-in'
                    id='LoginButton'
                    color='blue'
                    labelPosition='right'
                    content='Login'
                    onClick={(event, data) => {
                        document.getElementById('LoginButton').focus();
                    }}
                />
            }>
            <Modal.Header>Select a Member</Modal.Header>
            <Modal.Content>Insert Content Here</Modal.Content>
            <Modal.Actions>
                <Button
                    content='Close'
                    icon='close'
                    labelPosition='right'
                    color='red'
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default MenuScreen;
