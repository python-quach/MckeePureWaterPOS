import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    TransitionablePortal,
    Segment,
    Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { getCurrentTime, currentDate } from '../../helpers/helpers';
import AddForm from './AddForm';
import * as actions from '../../../actions';

const AddScreen = (props) => {
    const {
        lastRecord,
        lastAccount,
        addForm,
        firstName,
        lastName,
        history,
        account,
        renewFee,
        renewalAmount,
        clearAddAccount,
        memberSince,
        phone,
        areaCode,
    } = props;

    const [open, setOpenPortal] = useState(true);
    const handleClose = () => {
        setOpenPortal(false);
        history.push('/find');
    };

    const handleBackButton = () => {
        if (props.membership.members) {
            setOpenPortal(false);
            history.push('/member');
        } else {
            setOpenPortal(false);
            history.push('find');
        }
    };

    useEffect(() => {
        document.getElementById('account').focus();
    }, [lastAccount]);

    return (
        <TransitionablePortal onClose={handleClose} open={open}>
            <Segment
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    bottom: '1%',
                    zIndex: 5000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>
                        <AddForm
                            clearAddAccount={clearAddAccount}
                            renewalAmount={renewalAmount}
                            renewFee={renewFee}
                            firstName={firstName}
                            lastName={lastName}
                            record={lastRecord}
                            phone={phone}
                            memberSince={memberSince}
                            areaCode={areaCode}
                            account={account}
                            add={addForm}
                            history={history}
                            clearMembership={props.clearMembership}
                            getAccount={props.getAccount}
                            addMembership={props.addMembership}
                        />
                        <Divider hidden />
                        <Button
                            content='Back'
                            floated='right'
                            onClick={handleBackButton}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('add');
    const {
        account: { lastRecord },
    } = state;

    return {
        initialValues: {
            memberSince: currentDate(),
            todayDate: currentDate(),
            todayTime: getCurrentTime(),
            account: '',
            record_id: lastRecord ? lastRecord + 1 : '',
            renewalFee: 0,
            renewalAmount: 0,
        },

        membership: state.membership,
        detail: state.account,
        lastRecord: state.account.lastRecord,
        lastAccount: state.account.lastAccount,
        areaCode: selectFormData(state, 'areaCode') || '',
        phone: selectFormData(state, 'phone') || '',
        firstName: selectFormData(state, 'firstName') || '',
        lastName: selectFormData(state, 'lastName') || '',
        account: selectFormData(state, 'account') || '',
        renewFee: selectFormData(state, 'renewalFee') || 0,
        renewalAmount: selectFormData(state, 'renewalAmount') || 0,
        memberSince: selectFormData(state, 'memberSince') || '',
        addForm: state.form.add ? state.form.add.values : {},
        submitSucceeded: state.form.add ? state.form.add.submitSucceeded : {},
    };
};

const ReduxForm = reduxForm({ form: 'add' })(AddScreen);
export default connect(mapStateToProps, actions)(ReduxForm);
