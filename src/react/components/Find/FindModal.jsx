import React, { useEffect } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import MembershipRow from '../MemberRow';
import FindModalHeader from './FindModalHeader';
import FindModalCloseButton from './FindModalCloseButton';
import DebugMessage from '../Debug/DebugMessage';

const FindModal = (props) => {
    const {
        hideField,
        clearForm,
        hideLogoutButton,
        closeMe,
        disable,
        handleSubmit,
        find,
        membership,
        history,
    } = props;
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

    useEffect(() => {
        if (membership.error) {
            console.log(membership.error);
            setOpen(false);
            hideLogoutButton(false);
            hideField(false);
            setHideButton(false);
        }
    }, [membership, setOpen, hideLogoutButton, hideField, setHideButton]);

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
            trigger={
                !hideButton ? (
                    <Button
                        type='submit'
                        disabled={disable}
                        circular
                        fluid
                        size='massive'
                        id='FindButton'
                        primary
                        labelPosition='right'
                        icon='search'
                        content='Find Membership'
                        onClick={handleSubmit((values) => {
                            console.log('submitting values', { values });

                            // const {
                            //     phone,
                            //     account,
                            //     firstName,
                            //     lastName,
                            // } = values;

                            // console.log(values.phone.replace(/-/g, ''));
                            find(values, (response) => {
                                if (response.error) {
                                    setOpen(false);
                                    hideLogoutButton(false);
                                    hideField(false);
                                    setHideButton(false);
                                    // hideButtons();
                                }
                            });
                            // hideButtons();
                        })}
                    />
                ) : null
            }>
            <FindModalHeader hide={hide} content='Select a Membership Modal' />
            <Modal.Content>
                <MembershipRow
                    hideField={hideField}
                    hideRow={setHide}
                    hide={hide}
                />
                <DebugMessage membership={membership} />
            </Modal.Content>
            <Modal.Actions>
                <FindModalCloseButton hide={hide} close={closeModal} />
            </Modal.Actions>
        </Modal>
    );
};

FindModal.defaultProps = {};

export default FindModal;
