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
        getLastAccount,
        getLastRecord,
        lastRecord,
        lastAccount,
        addForm,
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

    // useEffect(() => {
    //     // if (!lastRecord || !lastAccount) {
    //     //     getLastAccount(() => {});
    //     //     getLastRecord(() => {});
    //     // }
    //     getLastAccount(() => {});
    //     getLastRecord(() => {});
    // }, [lastRecord, getLastAccount, lastAccount, getLastRecord]);

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
                        <DebugMessage addForm={addForm} />
                        <AddForm
                            date={currentDate}
                            time={getCurrentTime}
                            record={lastRecord}
                            account={lastAccount}
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
        phone: selectFormData(state, 'phone') || '',
        addForm: state.form.add ? state.form.add.values : {},
        submitSucceeded: state.form.add ? state.form.add.submitSucceeded : {},
    };
};

// const ReduxForm = reduxForm({ form: 'add', enableReinitialize: true })(
const ReduxForm = reduxForm({ form: 'add' })(AddScreen);
export default connect(mapStateToProps, actions)(ReduxForm);
