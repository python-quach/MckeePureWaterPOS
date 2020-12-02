import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import MembershipRow from './MemberRow';

const FindMemberModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const [hide, setHide] = React.useState(false);

    return (
        <Modal
            style={{ marginLeft: '40px' }}
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
                    icon='search'
                    id='LoginButton'
                    color='teal'
                    labelPosition='right'
                    content='Find Membership'
                    onClick={(event, data) => {
                        document.getElementById('LoginButton').focus();
                    }}
                />
            }>
            {open ? (
                <>
                    {!hide ? (
                        <Modal.Header>Select a Member</Modal.Header>
                    ) : null}

                    <Modal.Content>
                        <MembershipRow hideRow={setHide} hide={hide} />
                    </Modal.Content>
                    <Modal.Actions>
                        {!hide ? (
                            <Button
                                content='Close'
                                icon='close'
                                labelPosition='right'
                                color='red'
                                onClick={() => {
                                    setOpen(false);
                                    props.hideField(true);
                                }}
                            />
                        ) : null}
                    </Modal.Actions>
                </>
            ) : null}
        </Modal>
    );
};

export default FindMemberModal;
