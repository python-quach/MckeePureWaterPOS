import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import MembershipRow from '../MemberRow';
import FindMembershipButton from './FindMembershipButton';
import FindModalHeader from './FindModalHeader';
import FindModalCloseButton from './FindModalCloseButton';

const FindModal = (props) => {
    const { hideField, clearForm, hideLogoutButton, closeMe } = props;
    const [open, setOpen] = React.useState(false);
    const [hide, setHide] = React.useState(false);
    const [hideButton, setHideButton] = React.useState(false);

    const hideButtons = () => {
        setHideButton(true);
        hideField(true);
        clearForm();
        hideLogoutButton(true);
    };

    const closeModal = () => {
        closeMe(true);
        setOpen(false);
        hideField(false);
        setHideButton(false);
        hideLogoutButton(false);
    };

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
            onUnmount={() => console.log('umount model')}
            open={open}
            // open={props.open}
            trigger={
                !hideButton ? (
                    <Button
                        circular
                        fluid
                        size='massive'
                        id='FindButton'
                        primary
                        labelPosition='right'
                        icon='search'
                        content='Find Membership'
                        onClick={() => {
                            hideButtons();
                        }}></Button>
                ) : null
            }>
            <FindModalHeader hide={hide} content='Select a Membership Modal' />
            <Modal.Content>
                <MembershipRow
                    hideField={hideField}
                    hideRow={setHide}
                    hide={hide}
                />
                <MembershipRow
                    hideField={hideField}
                    hideRow={setHide}
                    hide={hide}
                />
                <MembershipRow
                    hideField={hideField}
                    hideRow={setHide}
                    hide={hide}
                />
            </Modal.Content>
            <Modal.Actions>
                <FindModalCloseButton hide={hide} close={closeModal} />
            </Modal.Actions>
        </Modal>
    );
};

FindModal.defaultProps = {};

export default FindModal;
