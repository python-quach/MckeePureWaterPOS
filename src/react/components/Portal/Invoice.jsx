import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

const Invoice = (props) => {
    const [openInvoice, setOpenInvoice] = useState(false);

    useEffect(() => {
        if (openInvoice) console.log({ props });
    });

    return (
        <Modal
            open={openInvoice}
            size='large'
            closeOnDocumentClick={false}
            closeOnDimmerClick={false}
            closeOnEscape={false}
            closeOnPortalMouseLeave={false}
            closeOnTriggerClick={false}
            onClose={() => setOpenInvoice(false)}
            onOpen={() => setOpenInvoice(true)}
            trigger={
                <Button
                    floated='right'
                    color='teal'
                    content='history'
                    onClick={() => console.log('Modal Open')}></Button>
            }>
            <Modal.Header>Invoice History</Modal.Header>
            <Modal.Content></Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpenInvoice(false)}>
                    Nope
                </Button>
                <Button
                    content="Yep, that's me"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpenInvoice(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default Invoice;
