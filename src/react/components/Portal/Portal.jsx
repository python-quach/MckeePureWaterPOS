import React, { useState } from 'react';
import {
    TransitionablePortal,
    Segment,
    Header,
    Button,
    Grid,
    Image,
    Form,
    Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../types';
import MembershipRow from '../MemberRow';

const PortalMembership = (props) => {
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
            {/* <TransitionablePortal onClose={handleClose} open={open}> */}
            <Segment
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    bottom: '1%',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>
                        <MembershipRow
                            hideField={setHideField}
                            hideRow={setHide}
                            hide={hide}
                            close={handleClose}
                            history={props.history}
                        />
                        {/* {!hide ? (
                            <Button
                                content='close'
                                onClick={handleClose}></Button>
                        ) : null} */}
                    </Grid.Column>
                </Grid>
                <pre>{JSON.stringify(membership, null, 2)}</pre>
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

export default connect(mapStateToProps, mapDispatchToProps)(PortalMembership);
