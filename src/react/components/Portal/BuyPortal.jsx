import React, { useState } from 'react';
import {
    TransitionablePortal,
    Segment,
    Grid,
    Modal,
    Header,
    Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../types';
import MembershipRow from '../MemberRow';
import BuyForm from '../BuyForm';

const BuyPortal = (props) => {
    const { membership, clearMembership } = props;
    const [open, setOpenPortal] = useState(true);
    const [hideField, setHideField] = useState(false);
    const [hide, setHide] = React.useState(false);

    const handleClose = () => {
        setOpenPortal(false);
        clearMembership();
        props.history.push('/find');
    };
    return (
        <TransitionablePortal onClose={handleClose} open={open}>
            <Segment
                style={{
                    // top: '1px',
                    bottom: '0px',
                    // left: '1%',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    // bottom: '1%',
                    // left: '1%',
                    zIndex: 1000,
                    // right: '10%',
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>
                        <BuyForm />
                        {/* <Modal
                            closeOnDimmerClick={false}
                            closeOnEscape={false}
                            closeOnDocumentClick={false}
                            closeOnPortalMouseLeave={false}
                            closeOnTriggerClick={false}
                            basic
                            style={{ marginLeft: '40px' }}
                            size='fullscreen'
                            // dimmer='blurring'
                            // onClose={() => setOpen(false)}
                            // onOpen={() => setOpen(true)}
                            open={open}>
                            <Modal.Header>Buy Water </Modal.Header>
                            <Modal.Content>
                                <BuyForm />
                            </Modal.Content>
                            <Modal.Actions> */}
                        <Button
                            circular
                            size='huge'
                            primary
                            // onClick={closeModal}
                            onClick={handleClose}
                            content='Done'
                            labelPosition='right'
                            icon='right chevron'
                        />
                        <Button
                            circular
                            size='huge'
                            secondary
                            onClick={handleClose}
                            // onClick={closeModal}
                            content='Cancel'
                            labelPosition='right'
                            icon='delete'
                        />
                        {/* </Modal.Actions> */}
                        {/* </Modal> */}
                    </Grid.Column>
                </Grid>
                {/* <pre>{JSON.stringify(membership, null, 2)}</pre> */}
            </Segment>
        </TransitionablePortal>
    );
};

const mapStateToProps = (state) => {
    return {
        membership: state.membership,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearMembership: () => dispatch({ type: actionTypes.CLEAR_MEMBERSHIP }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyPortal);
