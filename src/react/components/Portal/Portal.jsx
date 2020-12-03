import React, { useEffect, useState } from 'react';
import {
    TransitionablePortal,
    Segment,
    Header,
    Button,
} from 'semantic-ui-react';

const PortalMembership = (props) => {
    const [open, setOpenPortal] = useState(true);

    const handleClick = () => {
        setOpenPortal((prevState) => !prevState);
    };

    const handleClose = () => {
        setOpenPortal(false);
        props.history.push('/find');
    };
    return (
        <TransitionablePortal onClose={handleClose} open={open}>
            <Segment
                style={{
                    // left: '10%',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    bottom: '1%',
                    // top: '1%',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Header>This is a controlled portal</Header>
                <Button content='close' onClick={handleClose}></Button>
                <p>
                    Portals have tons of great callback functions to hook into.
                </p>
                <p>To close, simply click the close button or click away</p>
            </Segment>
        </TransitionablePortal>
    );
};

export default PortalMembership;
