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
import DebugMessage from '../../components/Debug/DebugMessage';
import * as actions from '../../../actions';

const AddScreen = (props) => {
    const {
        lastRecord,
        lastAccount,
        addForm,
        getLastRecord,
        firstName,
        lastName,
        history,
    } = props;
    const [open, setOpenPortal] = useState(true);

    const handleClose = () => {
        setOpenPortal(false);
        props.history.push('/find');
    };

    const handleBackButton = () => {
        if (props.membership.members) {
            setOpenPortal(false);
            props.history.push('/member');
        } else {
            setOpenPortal(false);
            props.history.push('find');
        }
    };

    useEffect(() => {
        if (!lastRecord || !lastAccount) {
            props.history.push('/find');
        }
    });

    // useEffect(() => {
    //     if (!lastRecord && !lastAccount) {
    //         props.getLastAccount(() => {
    //             props.getLastRecord(() => {});
    //         });
    //     }
    // });

    useEffect(() => {
        if (lastRecord && lastAccount) console.log({ lastRecord, lastAccount });
    }, [lastRecord, lastAccount]);

    useEffect(() => {
        document.getElementById('areaCode').focus();
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
                        {/* <DebugMessage addForm={addForm} /> */}
                        <AddForm
                            date={currentDate}
                            time={getCurrentTime}
                            firstName={firstName}
                            lastName={lastName}
                            record={lastRecord}
                            getLastRecord={getLastRecord}
                            account={lastAccount}
                            add={addForm}
                            history={history}
                            find={props.find}
                            clearAccount={props.clearAccount}
                            clearMembership={props.clearMembership}
                            getAccount={props.getAccount}
                            addNewMembership={props.addNewMembership}
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
        account: { lastAccount, lastRecord },
    } = state;

    return {
        initialValues: {
            memberSince: currentDate(),
            todayDate: currentDate(),
            todayTime: getCurrentTime(),
            account: lastAccount ? lastAccount + 1 : '',
            record_id: lastRecord ? lastRecord + 1 : '',
        },

        membership: state.membership,
        account: state.account.account,
        detail: state.account,
        lastRecord: state.account.lastRecord,
        lastAccount: state.account.lastAccount,
        areaCode: selectFormData(state, 'areaCode') || '',
        phone: selectFormData(state, 'phone') || '',
        firstName: selectFormData(state, 'firstName') || '',
        lastName: selectFormData(state, 'lastName') || '',
        addForm: state.form.add ? state.form.add.values : {},
        submitSucceeded: state.form.add ? state.form.add.submitSucceeded : {},
    };
};

const ReduxForm = reduxForm({ form: 'add' })(AddScreen);
export default connect(mapStateToProps, actions)(ReduxForm);
