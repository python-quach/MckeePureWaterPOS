import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import {
    currentDate,
    getCurrentTime,
    normalizeAreaCode,
    normalizeInput,
    verifyAccount,
} from '../../helpers/helpers';
import Date from '../Field/Date';
import Time from '../Field/Time';
import MemberSince from '../Field/MemberSince';
import Account from '../Field/Account';

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
                        prevGallon: gallonAmount,
                        buyGallon: 0,
                        gallonLeft: gallonAmount,
                        overGallon: gallonAmount,
                        preOver: gallonAmount,
                        renew: parseInt(gallonAmount),
                        renewFee: parseInt(fee),
                        lastRenewGallon: parseInt(gallonAmount),
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
                    disabled={added}
                    readOnly={added}
                    id='areaCode'
                    className='AreaCode'
                    inverted={true}
                    name='areaCode'
                    placeholder='xxx'
                    component={Form.Input}
                    label='Area Code'
                    normalize={normalizeAreaCode}
                    width={1}
                />
                <Field
                    readOnly={added}
                    id='phone'
                    className='PhoneNumber'
                    inverted={true}
                    disabled={added}
                    name='phone'
                    placeholder='xxx-xxxx'
                    width={2}
                    component={Form.Input}
                    label='Phone Number'
                    normalize={normalizeInput}
                />
                <Field
                    readOnly={added}
                    disabled={added}
                    id='firstName'
                    name='firstName'
                    inverted={true}
                    className='PhoneNumber'
                    placeholder='Enter Name'
                    width={2}
                    component={Form.Input}
                    label='First Name'
                    normalize={(value) => {
                        if (value.match(/^[a-zA-Z]+$/g))
                            return value.toUpperCase();
                    }}
                />
                <Field
                    disabled={added}
                    readOnly={added}
                    name='lastName'
                    label='Last Name'
                    inverted={true}
                    className='PhoneNumber'
                    placeholder='Enter Name'
                    width={2}
                    component={Form.Input}
                    normalize={(value) => {
                        if (value.match(/^[a-zA-Z]+$/g))
                            return value.toUpperCase();
                    }}
                />
                <Form.Input type='hidden' width={7} />
                <Form.Input
                    readOnly={added}
                    id='renew'
                    label='Fee'
                    name='renewalFee'
                    className='AreaCode'
                    value={fee}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setFee(0);
                        } else {
                            setFee(parseInt(value));
                        }
                    }}
                    inverted={true}
                    width={1}
                    disabled={added}
                />
                <Form.Input
                    readOnly={added}
                    label='Gallon'
                    name='renewalAmount'
                    className='AreaCode'
                    value={gallonAmount}
                    disabled={!fee || added}
                    inverted={true}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setGallonAmount(0);
                        } else {
                            setGallonAmount(parseInt(value));
                        }
                    }}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13 ? addNew(e) : null
                    }
                    width={1}
                />
                <Form.Button
                    content='Add'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    disabled={
                        !fee ||
                        !gallonAmount ||
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
