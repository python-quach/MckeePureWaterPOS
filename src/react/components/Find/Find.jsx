import React, { useEffect, useState } from 'react';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import { TransitionablePortal, Segment, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { channels } from '../../../shared/constants';
import FindGrid from '../Grid/Grid';
import FindForm from './FindForm';
import FindLogoutButton from './FindLogoutButton';
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
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');
    const [open, setOpen] = useState(props.user_id ? true : false);
    const [animation, setAnimation] = useState('vertical flip');
    const [duration, setDuration] = useState(800);
    const [closeMe, setCloseMe] = useState(false);
    const [hideLogoutButton, setHideLogoutButton] = React.useState(false);

    // Modal
    // const [openModal, setOpenModal] = React.useState(false);
    // const [hide, setHide] = React.useState(false);
    // const [hideButton, setHideButton] = React.useState(false);

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
                        clearFields={clearFields}
                        hideLogoutButton={setHideLogoutButton}
                        closeMe={setCloseMe}
                        clearForm={clearForm}
                        size='large'
                        handleSubmit={handleSubmit((values) => {
                            find(values);
                        })}
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
                            history.push('/');
                        }}
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
