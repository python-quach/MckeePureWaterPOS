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
        add,
        find,
        getAccount,
        checkDuplicateAccount,
        accountT,
        record,
        firstName,
        lastName,
        addNewMembership,
        history,
        renewFee,
        renewalAmount,
    } = props;

    const [fee, setFee] = useState(0);
    const [gallonAmount, setGallonAmount] = useState(0);
    const [fullname, setFullName] = useState(null);
    const [added, setAdded] = useState(false);

    const addNew = (e) => {
        e.preventDefault();
        setAdded(true);
        checkDuplicateAccount(accountT, (data) => {
            if (!data) {
                addNewMembership(
                    {
                        record_id: record + 1,
                        account: accountT,
                        firstName: firstName,
                        lastName: lastName,
                        fullname: fullname,
                        memberSince: add.memberSince,
                        phone: add.phone,
                        prevGallon: renewalAmount,
                        buyGallon: 0,
                        gallonLeft: renewalAmount,
                        overGallon: renewalAmount,
                        preOver: renewalAmount,
                        renew: parseInt(renewalAmount),
                        renewFee: parseInt(renewFee),
                        lastRenewGallon: parseInt(renewalAmount),
                        invoiceDate: currentDate(),
                        invoiceTime: getCurrentTime(),
                        areaCode: add.areaCode,
                        threeDigit: add.phone.slice(0, 3),
                        fourDigit: add.phone.slice(4, 8),
                    },
                    (response) => {
                        console.log(response);
                        find({ account: accountT }, (data) => {
                            console.log(data);
                            getAccount(data.membership[0].account, () => {
                                props.clearMembership();
                                history.push('/account');
                            });
                        });
                    }
                );
            } else {
                props.clearMembership();
                console.log(data);
            }
        });
    };

    useEffect(() => {
        console.log({ add });
    }, [add]);

    useEffect(() => {
        console.log(props.add);
        const { firstName, lastName } = props.add;
        if (firstName && lastName) {
            setFullName(firstName + ' ' + lastName);
        }
    }, [props.add]);

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
                />
            </Form.Group>
            <Form.Group>
                <Field
                    name='areaCode'
                    component={AreaCode}
                    added={added}
                    normalize={normalizeAreaCode}
                />
                <Field
                    name='phone'
                    component={Phone}
                    added={added}
                    normalize={normalizeInput}
                />
                <Field
                    name='firstName'
                    added={added}
                    component={Name}
                    id='firstName'
                    label='First Name'
                    normalize={upperCaseName}
                />
                <Field
                    name='lastName'
                    added={added}
                    component={Name}
                    id='lastName'
                    label='Last Name'
                    normalize={upperCaseName}
                />
                <Form.Input type='hidden' width={7} />
                <Field
                    added={added}
                    name='renewalFee'
                    component={Fee}
                    normalize={verifyFee}
                />
                <Field
                    name='renewalAmount'
                    component={RenewGallon}
                    added={added}
                    renewFee={renewFee}
                    normalize={(value) => {
                        if (isNaN(parseInt(value))) {
                            return 0;
                        } else {
                            return parseInt(value);
                        }
                    }}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13 ? addNew(e) : null
                    }
                />
                <Form.Button
                    content='Add'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    disabled={
                        !renewFee ||
                        !renewalAmount ||
                        !add.areaCode ||
                        !add.phone ||
                        !add.lastName ||
                        !add.firstName ||
                        add.phone.length < 8 ||
                        add.areaCode.length < 3 ||
                        added
                    }
                    onClick={(e) => {
                        addNew(e);
                    }}
                />
            </Form.Group>
        </Form>
    );
};

export default AddForm;
