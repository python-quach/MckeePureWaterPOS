import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import {
    currentDate,
    getCurrentTime,
    normalizeAreaCode,
    normalizeInput,
    verifyAccount,
    upperCaseName,
    verifyFee,
    verifyRenewGallon,
} from '../../helpers/helpers';
import Date from '../Field/Date';
import Time from '../Field/Time';
import MemberSince from '../Field/MemberSince';
import Account from '../Field/Account';
import AreaCode from '../Field/AreaCode';
import Phone from '../Field/Phone';
import Name from '../Field/Name';
import Fee from '../Field/Fee';
import RenewGallon from '../Field/RenewGallon';

const AddForm = (props) => {
    const {
        getAccount,
        account,
        record,
        firstName,
        lastName,
        memberSince,
        phone,
        areaCode,
        history,
        renewFee,
        renewalAmount,
        clearAddAccount,
        addMembership,
    } = props;

    const [disabledAddButton, setDisableAddButton] = useState(true);
    const [member, setMember] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Redux Form Validation

    const addNewMember = (e) => {
        e.preventDefault();
        if (account) {
            addMembership(member, (data) => {
                if (data.error) {
                    clearAddAccount();
                    setError(true);
                    setErrorMessage(data.error);
                } else {
                    getAccount(member.account, () => {
                        history.push('/account');
                    });
                }
            });
        }
    };

    useEffect(() => {
        setMember({
            record_id: record + 1,
            account: account,
            firstName: firstName,
            lastName: lastName,
            fullname: firstName + ' ' + lastName,
            memberSince: memberSince,
            phone: phone,
            prevGallon: renewalAmount,
            buyGallon: 0,
            gallonLeft: renewalAmount,
            preOver: renewalAmount,
            renew: parseInt(renewalAmount),
            renewFee: parseInt(renewFee),
            lastRenewGallon: parseInt(renewalAmount),
            invoiceDate: currentDate(),
            invoiceTime: getCurrentTime(),
            areaCode: areaCode,
            threeDigit: phone ? phone.slice(0, 3) : '',
            fourDigit: phone ? phone.slice(4, 8) : '',
        });
    }, [
        record,
        account,
        firstName,
        lastName,
        memberSince,
        phone,
        renewalAmount,
        areaCode,
        renewFee,
    ]);

    useEffect(() => {
        setDisableAddButton(
            !renewFee ||
                !renewalAmount ||
                !areaCode ||
                !phone ||
                !lastName ||
                !firstName ||
                phone.length < 8 ||
                areaCode.length < 3 ||
                !account
        );
    }, [
        renewFee,
        renewalAmount,
        areaCode,
        phone,
        lastName,
        firstName,
        account,
    ]);

    return (
        <Form size='large'>
            <Form.Group>
                <Field name='todayDate' component={Date} />
                <Field name='todayTime' component={Time} />
                <Form.Input type='hidden' width={8} />
                <Field name='memberSince' component={MemberSince} />
                <Field
                    name='account'
                    component={Account}
                    normalize={verifyAccount}
                    error={error}
                    errorMessage={errorMessage}
                    onFocus={() => {
                        setError(false);
                        setErrorMessage('');
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Field
                    name='areaCode'
                    component={AreaCode}
                    normalize={normalizeAreaCode}
                />
                <Field
                    name='phone'
                    component={Phone}
                    normalize={normalizeInput}
                />
                <Field
                    name='firstName'
                    component={Name}
                    id='firstName'
                    label='First Name'
                    normalize={upperCaseName}
                />
                <Field
                    name='lastName'
                    component={Name}
                    id='lastName'
                    label='Last Name'
                    normalize={upperCaseName}
                />
                <Form.Input type='hidden' width={7} />
                <Field
                    name='renewalFee'
                    component={Fee}
                    normalize={verifyFee}
                />
                <Field
                    name='renewalAmount'
                    component={RenewGallon}
                    renewFee={renewFee}
                    normalize={verifyRenewGallon}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? addNewMember(e)
                            : null
                    }
                />
                <Form.Button
                    content='Add'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    disabled={disabledAddButton}
                    onClick={(e) => addNewMember(e)}
                />
            </Form.Group>
        </Form>
    );
};

export default AddForm;
