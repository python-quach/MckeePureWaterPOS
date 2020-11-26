import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

const BuyModal = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Modal
            style={{ marginLeft: '30px' }}
            basic
            size='fullscreen'
            dimmer='blurring'
            // dimmer='inverted'
            closeOnDimmerClick={false}
            closeOnEscape={false}
            onClose={() => setOpen(false)}
            // onClose={() => setOpen(true)}
            onOpen={() => {
                setOpen(true);
                // props.closeRow(false);
            }}
            open={open}
            trigger={
                <Form.Button
                    size='massive'
                    icon='search'
                    // id='LoginButton'
                    color='pink'
                    labelPosition='right'
                    content='Buy'
                    onClick={(event, data) => {
                        // props.closeRow(false);
                        // document.getElementById('LoginButton').focus();
                    }}
                />
            }>
            <Modal.Header>Buy Gallon</Modal.Header>
            <Modal.Content></Modal.Content>
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

// BuyModal.defaultProps = {
//     props: {
//         modal: {
//             // style: { marginLeft: '30px' },
//             basic: true,
//             size: 'large',
//             dimmer: 'blurring',
//             closeOnDimmerClick: false,
//             closeOnEscape: false,
//         },
//     },
// };

export default BuyModal;
