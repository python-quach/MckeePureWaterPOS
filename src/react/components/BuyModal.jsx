import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import BuyForm from './BuyForm';

const BuyModal = (props) => {
    const { setOpen, open, hideMemberRow } = props;
    // const { hideMemberRow } = props;

    // const [open, setOpen] = React.useState(false);

    const closeModal = () => {
        setOpen(false);
        hideMemberRow(false);
    };

    return (
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            closeOnDocumentClick={false}
            closeOnPortalMouseLeave={false}
            closeOnTriggerClick={false}
            basic
            style={{ marginLeft: '40px' }}
            size='fullscreen'
            dimmer='blurring'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Buy Water </Modal.Header>
            <Modal.Content>
                <BuyForm />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    circular
                    size='huge'
                    primary
                    onClick={closeModal}
                    content='Done'
                    labelPosition='right'
                    icon='right chevron'
                />
                <Button
                    circular
                    size='huge'
                    secondary
                    onClick={closeModal}
                    content='Cancel'
                    labelPosition='right'
                    icon='delete'
                />
            </Modal.Actions>
        </Modal>
    );
};

BuyModal.defaultProps = {};

export default BuyModal;
