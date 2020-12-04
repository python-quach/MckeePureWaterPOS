import React, { useState } from 'react';
import { TransitionablePortal, Segment, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../types';
import BuyForm from '../BuyForm';

const BuyPortal = (props) => {
    const { membership, clearMembership } = props;
    const [open, setOpenPortal] = useState(true);
    const [hideField, setHideField] = useState(false);
    const [hide, setHide] = React.useState(false);

    const handleClose = () => {
        setOpenPortal(false);
        // clearMembership();
        // props.history.push('/find');
        props.history.push('/portal');
    };
    return (
        <TransitionablePortal onClose={handleClose} open={open}>
            <Segment
                style={{
                    bottom: '0px',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>
                        <BuyForm />
                        <Button
                            circular
                            size='huge'
                            floated='right'
                            secondary
                            onClick={handleClose}
                            content='Cancel'
                            labelPosition='right'
                            icon='delete'
                        />
                        <Button
                            circular
                            size='huge'
                            primary
                            floated='right'
                            onClick={handleClose}
                            content='Buy'
                            labelPosition='right'
                            icon='right chevron'
                        />
                        <pre>{JSON.stringify(membership, null, 2)}</pre>
                    </Grid.Column>
                </Grid>
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
