import React, { useEffect, useState } from 'react';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import { TransitionablePortal, Segment, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { channels } from '../../../shared/constants';
import FindGrid from '../Grid/Grid';
import MemberRow from '../MemberRow';
import BuyForm from '../BuyForm';
const { ipcRenderer } = window;

function FindContainer(props) {
    const { phone, account, firstName, lastName, history } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');
    const [open, setOpen] = useState(props.user_id ? true : false);
    const [animation, setAnimation] = useState('vertical flip');
    // const [animation, setAnimation] = useState('fade');
    const [duration, setDuration] = useState(800);
    const [closeMe, setCloseMe] = useState(false);
    const [hideLogoutButton, setHideLogoutButton] = React.useState(false);
    const [disableFindButton, setDisableFindButton] = useState(false);

    useEffect(() => {
        console.log('FindContainer', { props });
    });

    useEffect(() => {
        if (!props.user_id) {
            history.push('/');
        }
    });

    useEffect(() => {
        if (closeMe) {
            setDuration(0);
        }
    }, [closeMe, setDuration]);

    useEffect(() => {
        if (!phone && !account && !lastName && !firstName) {
            setDisableFindButton(true);
        } else {
            phone.length === 8 ||
            account.length === 5 ||
            (firstName && lastName)
                ? setDisableFindButton(false)
                : setDisableFindButton(true);
        }
    }, [
        phone,
        account,
        firstName,
        lastName,
        disableFindButton,
        setDisableFindButton,
    ]);

    return (
        <TransitionablePortal
            open={open}
            transition={{ animation, duration }}
            onStart={() => console.log('onStart', { open })}
            onHide={() => console.log('closing trans', { open })}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column>
                            {/* <MemberRow /> */}
                            <Segment inverted raised color='blue'>
                                <BuyForm />
                                <MemberRow />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
}

FindContainer.defaultProps = {};
FindContainer.propTypes = {};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('membership');
    return {
        user_id: state.auth.user_id,
        phone: selectFormData(state, 'phone') || '',
        account: selectFormData(state, 'account') || '',
        firstName: selectFormData(state, 'firstName') || '',
        lastName: selectFormData(state, 'lastName') || '',
        submitSucceeded: state.form.membership
            ? state.form.membership.submitSucceeded
            : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => dispatch(reset('membership')),
        focusInput: (name) => {
            document.getElementById(name).focus();
        },
        find: ({ phone, account, firstName, lastName }) => {
            console.log('FindForm was submitted', {
                phone,
                account,
                firstName,
                lastName,
            });
            ipcRenderer.send(channels.FIND_MEMBERSHIP, {
                phone,
                account,
                firstName,
                lastName,
            });
        },
    };
};

const ReduxFindFrom = reduxForm({ form: 'membership' })(FindContainer);
export default connect(mapStateToProps, mapDispatchToProps)(ReduxFindFrom);
