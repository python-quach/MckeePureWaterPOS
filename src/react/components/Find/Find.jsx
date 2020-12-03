import React, { useEffect, useState } from 'react';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import { TransitionablePortal, Segment, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { channels } from '../../../shared/constants';
import FindGrid from '../Grid/Grid';
import FindForm from './FindForm';
import FindLogoutButton from './FindLogoutButton';
import DebugMessage from '../Debug/DebugMessage';
import * as actionTypes from '../../../types';
import actions from 'redux-form/lib/actions';

const { ipcRenderer } = window;

function FindContainer(props) {
    const {
        submitSucceeded,
        phone,
        account,
        firstName,
        lastName,
        clearForm,
        history,
        find,
        focusInput,
        handleSubmit,
        clearFields,
        membership,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');
    const [open, setOpen] = useState(props.user_id ? true : false);
    const [animation, setAnimation] = useState('vertical flip');
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
                <FindGrid>
                    <FindForm
                        membership={membership}
                        find={find}
                        history={history}
                        disableFindButton={disableFindButton}
                        clearFields={clearFields}
                        hideLogoutButton={setHideLogoutButton}
                        closeMe={setCloseMe}
                        clearForm={clearForm}
                        size='large'
                        handleSubmit={handleSubmit}
                        iconColor={iconColor}
                        errorMessage={errorMessage}
                        phone={phone}
                        account={account}
                        firstName={firstName}
                        lastName={lastName}
                        logout={() => {
                            history.push('/');
                        }}
                        focusInput={focusInput}
                        submitSucceeded={submitSucceeded}
                        setOpen={setOpen}
                    />
                    <Divider hidden />
                    <FindLogoutButton
                        hide={hideLogoutButton}
                        hideField={setHideLogoutButton}
                        logout={() => {
                            setOpen(false);
                            history.push('/');
                        }}
                    />
                    <DebugMessage
                        membership={membership}
                        phone={phone}
                        account={account}
                        firstName={firstName}
                        lastName={lastName}
                        submitSucceeded={submitSucceeded}
                    />
                </FindGrid>
            </Segment>
        </TransitionablePortal>
    );
}

FindContainer.defaultProps = {};
FindContainer.propTypes = {};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('membership');
    return {
        membership: state.membership,
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
        find: ({ phone, account, firstName, lastName }, callback) => {
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
            ipcRenderer.on(channels.FIND_MEMBERSHIP, (event, response) => {
                ipcRenderer.removeAllListeners(channels.FIND_MEMBERSHIP);
                console.log(response);
                dispatch({
                    type: actionTypes.FIND_MEMBERSHIP,
                    payload: response,
                });
                callback(response);
            });
        },
    };
};

const ReduxFindFrom = reduxForm({ form: 'membership' })(FindContainer);
export default connect(mapStateToProps, mapDispatchToProps)(ReduxFindFrom);
