import React, { useEffect, useState } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import {
    TransitionablePortal,
    Segment,
    Divider,
    Header,
    Icon,
    Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import FindGrid from '../Grid/Grid';
import FindForm from './FindForm';
import FindLogoutButton from './FindLogoutButton';
import * as actions from '../../../actions';
import { currentDate, getCurrentTime } from '../../helpers/helpers';
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
        clearMembership,
        getAccount,
        getDailyReport,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');
    const [open, setOpen] = useState(props.user_id ? true : false);
    const [animation, setAnimation] = useState('vertical flip');
    const [duration, setDuration] = useState(500);
    const [closeMe, setCloseMe] = useState(false);
    const [hideLogoutButton, setHideLogoutButton] = useState(false);
    const [disableFindButton, setDisableFindButton] = useState(false);

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

    useEffect(() => {
        if (membership.error) {
            clearForm();
        }
    }, [clearForm, membership.error]);

    return (
        <TransitionablePortal
            open={open}
            transition={{ animation, duration }}
            onClose={() => console.log('onClose', { open })}
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
                    <Header as='h1' inverted size='huge' textAlign='left'>
                        <Icon name='braille' color='blue' />
                        <Header.Content>
                            Mckee Pure Water
                            <Header.Subheader>Version 1.0</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Divider />
                    <FindForm
                        getAccount={getAccount}
                        setOpenFind={setOpen}
                        clearMembership={clearMembership}
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
                        logout={() => history.push('/')}
                        focusInput={focusInput}
                        submitSucceeded={submitSucceeded}
                        setOpen={setOpen}
                        setErrorMessage={setErrorMessage}
                        setIconColor={setIconColor}
                        setAnimation={setAnimation}
                    />

                    <Divider hidden />

                    <Button
                        disabled={
                            phone || account || firstName || lastName
                                ? true
                                : false
                        }
                        color='teal'
                        circular={true}
                        fluid={true}
                        size='huge'
                        id='AddButton'
                        icon='add circle'
                        labelPosition='right'
                        content='New Membership'
                        onClick={() => {
                            console.log('Add New MemberShip');

                            props.getLastRecord(() => {
                                props.history.push('/add');
                            });

                            // props.getLastAccount((account) => {
                            //     console.log(account);
                            //     props.getLastRecord(() => {
                            //         props.history.push('/add');
                            //     });
                            // });
                        }}
                    />
                    <Divider hidden />

                    <Button
                        color='yellow'
                        circular={true}
                        fluid={true}
                        size='huge'
                        id='ReportButton'
                        icon='file outline'
                        labelPosition='right'
                        content={`Daily Report: ${currentDate()}`}
                        onClick={() => {
                            console.log('Daily Sales Report', currentDate());
                            getDailyReport(
                                currentDate(),
                                getCurrentTime(),
                                (data) => {
                                    console.log({ data });
                                }
                            );
                        }}
                    />

                    <Divider hidden />
                    <FindLogoutButton
                        hide={hideLogoutButton}
                        hideField={setHideLogoutButton}
                        logout={() => {
                            setOpen(false);
                            clearMembership();
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

const ReduxFindFrom = reduxForm({ form: 'membership' })(FindContainer);
export default connect(mapStateToProps, actions)(ReduxFindFrom);
