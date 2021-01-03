import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import {
    currentDate,
    getCurrentTime,
    normalizeAreaCode,
    normalizeInput,
} from '../../helpers/helpers';

const AddForm = (props) => {
    const {
        add,
        find,
        getAccount,
        getLastRecord,
        account,
        record,
        firstName,
        lastName,
        addNewMembership,
        history,
    } = props;
    const [currentGallon, setCurrentGallon] = useState(0);
    const [buyGallon, setBuyGallon] = useState(0);
    const [remain, setRemainGallon] = useState(0);
    const [fee, setFee] = useState(0);
    const [gallonAmount, setGallonAmount] = useState(0);
    const [fullname, setFullName] = useState(null);
    const [newMember, setNewMember] = useState(null);
    const [added, setAdded] = useState(false);

    const [errorAreaCodeMessage, setErrorAreaCodeMessage] = useState(null);
    const [errorPhone, setErrorPhone] = useState(null);

    const addNew = (e) => {
        e.preventDefault();
        setCurrentGallon(gallonAmount);
        setRemainGallon(gallonAmount);
        setAdded(true);
        addNewMembership(
            {
                record_id: record + 1,
                account: account + 1,
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
            () => {
                // props.clearMembership();
                // props.clearAccount();

                // console.log(account);
                // history.push('/account');
                // getAccount(account + 1, () => {
                //     history.push('/account');
                // });
                find({ account: account + 1 }, (data) => {
                    // props.clearMembership();
                    // props.clearAccount();
                    // console.log(data.membership);
                    getAccount(data.membership[0].account, () => {
                        props.clearMembership();
                        // props.clearAccount();
                        // props.clearAccount();
                        history.push('/account');
                    });
                });
            }
        );
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

    useEffect(() => {
        console.log({ newMember });
    }, [newMember]);

    // useEffect(() => {
    //     if (added) {
    //         setRemainGallon(currentGallon - buyGallon);
    //         document.getElementById('buy').focus();
    //         getLastRecord((lastRecord) => {
    //             console.log('getting last record:', lastRecord);
    //             document.getElementById('buy').focus();
    //             // setAdded(false);
    //         });
    //     }
    // }, [added, getLastRecord, currentGallon, buyGallon]);

    return (
        <Form size='large'>
            <Form.Group>
                <Field
                    name='todayDate'
                    className='TodayDate'
                    inverted={true}
                    icon='calendar'
                    placeholder='mm/dd/yyyy'
                    iconPosition='left'
                    readOnly
                    width={2}
                    component={Form.Input}
                    label='Today Date'
                />
                <Field
                    name='todayTime'
                    label='Current Time'
                    component={Form.Input}
                    className='TodayDate'
                    inverted={true}
                    placeholder='00:00:00 PM'
                    icon='time'
                    iconPosition='left'
                    readOnly
                    width={2}
                />
                <Form.Input type='hidden' width={8} />
                <Field
                    name='memberSince'
                    label='Member Since'
                    readOnly
                    className='TodayDate'
                    component={Form.Input}
                    inverted={true}
                    placeholder='mm/dd/yyy'
                    icon='calendar'
                    iconPosition='left'
                    width={2}
                />
                <Field
                    readOnly
                    label='Account'
                    name='account'
                    className='BuyAccount'
                    placeholder='xxxxxx'
                    component={Form.Input}
                    inverted={true}
                    icon='hashtag'
                    iconPosition='left'
                    width={2}
                />
                <Field
                    readOnly
                    label='Invoice'
                    name='record_id'
                    component={Form.Input}
                    className='TodayDate'
                    placeholder='xxxxxxx'
                    inverted={true}
                    icon='hashtag'
                    iconPosition='left'
                    width={2}
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
                    error={errorAreaCodeMessage}
                    width={1}
                    placeholder='xxx'
                    component={Form.Input}
                    label='Area Code'
                    normalize={normalizeAreaCode}
                />
                <Field
                    readOnly={added}
                    error={errorPhone}
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
                <Form.Input type='hidden' width={5} />
                <Form.Input
                    readOnly={added}
                    id='renew'
                    label='Renew Fee'
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
                    content='Add Membership'
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
                        added
                    }
                    onClick={(e) => {
                        addNew(e);
                    }}
                />
            </Form.Group>
            {/* <Form.Group>
                <Form.Input type='hidden' width={12} />
                <Form.Input
                    name='currentGallon'
                    className='AreaCode'
                    value={currentGallon}
                    disabled={!currentGallon && !added}
                    width={1}
                    readOnly
                    inverted={true}
                    label='Current'
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setCurrentGallon(0);
                        } else {
                            setCurrentGallon(parseInt(value));
                        }
                    }}
                />
                <Form.Input
                    name='gallonBuy'
                    className='AreaCode'
                    id='buy'
                    label='Buy'
                    value={buyGallon}
                    disabled={!added}
                    inverted={true}
                    width={1}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setBuyGallon(0);
                            setRemainGallon(currentGallon);
                        } else {
                            if (value <= currentGallon) {
                                setBuyGallon(parseInt(value));
                                setRemainGallon(
                                    parseInt(currentGallon) - parseInt(value)
                                );
                            }
                        }
                    }}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? props.buyWaterGallon(e)
                            : null
                    }
                />

                <Form.Input
                    name='remain'
                    label='Remain'
                    className={
                        props.gallonBuy > props.currentGallon
                            ? 'Remain'
                            : 'AreaCode'
                    }
                    width={1}
                    readOnly
                    type='text'
                    inverted={true}
                    disabled={!remain}
                    value={remain}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setRemainGallon(0);
                        } else {
                            setRemainGallon(parseInt(value));
                        }
                    }}
                />
                <Form.Button
                    content='Buy'
                    size='large'
                    style={{
                        marginTop: '30px',
                    }}
                    color='green'
                    // disabled={!currentGallon && !buyGallon}
                    disabled={!currentGallon || !buyGallon}
                    onClick={props.buyWaterGallon}
                    width={1}
                />
            </Form.Group> */}
        </Form>
    );
};

export default AddForm;
