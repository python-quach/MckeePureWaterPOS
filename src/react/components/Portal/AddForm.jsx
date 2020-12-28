import React, { useState, useEffect } from 'react';
import {
    Form,
    TransitionablePortal,
    Segment,
    Header,
    Button,
    Card,
    Image,
    Icon,
    Statistic,
    Step,
} from 'semantic-ui-react';
import { Field, reset } from 'redux-form';
import {
    currentDate,
    getCurrentTime,
    normalizeAreaCode,
    normalizeInput,
} from '../../helpers/helpers';
import { getLastRecord } from '../../../actions';

const AddForm = (props) => {
    const {
        add,
        getLastRecord,
        account,
        record,
        firstName,
        lastName,
        addNewMembership,
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

    // TRANSITIONAL PORTAL
    const transitions = [
        'browse',
        'browse right',
        'drop',
        'fade',
        'fade up',
        'fade down',
        'fade left',
        'fade right',
        'fly up',
        'fly down',
        'fly left',
        'fly right',
        'horizontal flip',
        'vertical flip',
        'scale',
        'slide up',
        'slide down',
        'slide left',
        'slide right',
        'swing up',
        'swing down',
        'swing left',
        'swing right',
        'zoom',
    ];

    // const options = transitions.map((name) => ({
    //     key: name,
    //     text: name,
    //     value: name,
    // }));

    // state = { animation: transitions[0], duration: 500, open: false };

    const [animation, setAnimation] = useState(
        transitions[transitions.length - 1]
    );
    const [duration, setDuration] = useState(500);
    const [openReceipt, setOpenReceipt] = useState(false);

    // const handleClick = () => {
    //     addNewMembership(newMember);
    //     // setOpenReceipt((prevState) => !prevState);
    //     console.log({ newMember });
    // };

    // const [areaCodeCheck, setAreaCode] = useState(
    //     add.areaCode ? add.areaCode : 0
    // );

    // Renew
    // const [renewalFee, setRenewalFee] = useState(0);
    // const [renewAmount, setRenewAmount] = useState(0);

    // const renewWaterGallon = (e) => {
    //     e.preventDefault();
    //     getLastRecord((lastRecord) => {
    //         const updateGallon = parseInt(gallonRemain) + parseInt(renewAmount);
    //         const renewData = {
    //             record_id: parseInt(lastRecord.record_id) + 1,
    //             account: detail.account,
    //             firstName: detail.firstName,
    //             lastName: detail.lastName,
    //             fullname: detail.fullname,
    //             memberSince: detail.memberSince,
    //             phone: detail.phone,
    //             prevGallon: updateGallon,
    //             buyGallon: 0,
    //             gallonLeft: updateGallon,
    //             overGallon: updateGallon,
    //             preOver: detail.overGallon,
    //             renew: parseInt(renewAmount),
    //             renewFee: parseInt(renewalFee),
    //             lastRenewGallon: parseInt(renewAmount),
    //             invoiceDate: currentDate(),
    //             invoiceTime: getCurrentTime(),
    //             areaCode: detail.areaCode,
    //             threeDigit: detail.field6,
    //             fourDigit: detail.field7,
    //         };

    //         // renew(renewData, () => {
    //         //     getAccount(account, (currentRecord) => {
    //         resetRenewData(currentRecord);
    //     });
    // });
    //     });
    // };

    // const required = (value) =>
    //     value || typeof value === 'number' ? undefined : 'required';

    const addNew = (e) => {
        e.preventDefault();
        setCurrentGallon(gallonAmount);
        setRemainGallon(gallonAmount);
        setAdded(true);
        addNewMembership({
            // ...add,
            record_id: record + 1,
            account: account + 1,
            firstName: firstName,
            lastName: lastName,
            fullname: fullname,
            memberSince: add.memberSince,
            phone: add.phone,
            // prevGallon: 0,
            prevGallon: gallonAmount,
            buyGallon: 0,
            gallonLeft: gallonAmount,
            overGallon: gallonAmount,
            // preOver: 0,
            preOver: gallonAmount,
            renew: parseInt(gallonAmount),
            renewFee: parseInt(fee),
            lastRenewGallon: parseInt(gallonAmount),
            // invoiceDate: add.invoiceDate,
            // invoiceTime: add.invoiceTime,
            invoiceDate: currentDate(),
            invoiceTime: getCurrentTime(),
            areaCode: add.areaCode,
            threeDigit: add.phone.slice(0, 3),
            fourDigit: add.phone.slice(4, 8),
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

    useEffect(() => {
        console.log({ newMember });
    }, [newMember]);

    useEffect(() => {
        if (added) {
            setRemainGallon(currentGallon - buyGallon);
            getLastRecord((lastRecord) => {
                console.log('getting last record:', lastRecord);
                document.getElementById('buy').focus();
                // setAdded(false);
            });
            // document.getElementById('buy').focus();
        }
    }, [added, getLastRecord, currentGallon, buyGallon]);

    useEffect(() => {
        // if (add.areaCode && add.areaCode.length === 3) {
        //     setErrorAreaCodeMessage(null);
        //     document.getElementById('phone').focus();
        // }
        // if (add.phone) {
        //     console.log('phone legnth', add.phone.length);
        // }
        // if (add.phone && add.phone.length === 8) {
        //     setErrorPhone(null);
        //     document.getElementById('firstName').focus();
        // }
        // if (add.areaCode && add.areaCode.length < 3) {
        //     setErrorAreaCodeMessage('3 number');
        // }
        // if (add.areaCode && add.areaCode.length === 3) {
        //     setErrorMessage(null);
        // }
    }, [add.areaCode, add.phone]);
    // useEffect(() => {
    //     if (add.areaCode && add.areaCode.length === 3)
    //         document.getElementById('Phone').focus();
    //     if (add.phone && add.phone.length === 8) {
    //         document.getElementById('firstName').focus();
    //     }
    // }, [add.areaCode, add.phone]);

    // useEffect(() => {
    //     if (add.areaCode.length < 3) {
    //         console.log('error with error code');
    //     }
    // }, [add.areaCode]);

    // const checkAreaCode = () => {
    //     console.log(add.areaCode);
    // };

    // useEffect(() => {
    //     // checkAreaCode()
    // }, [add.areaCode, checkAreaCode])

    return (
        <Form size='large'>
            <Form.Group>
                <Field
                    name='todayDate'
                    // error={!newMember ? false : true}
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
                    // error={!newMember ? false : true}
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
                    // error={!newMember ? false : true}
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
                    // readOnly={!newMember ? false : true}
                    // error={!newMember ? false : true}
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
                    // readOnly={!newMember ? false : true}
                    readOnly
                    // error={!newMember ? false : true}
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
                    readOnly={!newMember ? false : true}
                    // validate={[required]}
                    // error={!newMember ? false : true}
                    // error='Require 3 digit'
                    id='areaCode'
                    className='AreaCode'
                    inverted={true}
                    name='areaCode'
                    error={errorAreaCodeMessage}
                    width={1}
                    placeholder='xxx'
                    component={Form.Input}
                    // onChange={() => {
                    //     console.log(add.areaCode);
                    //     if (add.areaCode && add.areaCode.length > 2) {
                    //         document.getElementById('Phone').focus();
                    //     }
                    // }}
                    // onChange={() => {
                    //     if (add.areaCode.length === 3) {
                    //         setErrorMessage(null);
                    //     }
                    // }}
                    label='Area Code'
                    normalize={normalizeAreaCode}
                />
                <Field
                    readOnly={!newMember ? false : true}
                    error={errorPhone}
                    // disabled={areaCodeCheck}
                    // disabled={
                    //     !add.areaCode || add.areaCode.length < 3 ? true : false
                    // }
                    // error={!newMember ? false : true}
                    // disabled={!}
                    // disabled={add.areaCode ? false : add.areaCode.length < 3}
                    id='phone'
                    className='PhoneNumber'
                    inverted={true}
                    name='phone'
                    placeholder='xxx-xxxx'
                    width={2}
                    component={Form.Input}
                    label='Phone Number'
                    // onFocus={() => {
                    //     console.log(add.areaCode);
                    //     if (add.areaCode && add.areaCode.length < 3) {
                    //         setErrorAreaCodeMessage('3 number');
                    //         document.getElementById('areaCode').focus();
                    //     }
                    //     if (add.areaCode && add.areaCode.length === 3) {
                    //         setErrorAreaCodeMessage(null);
                    //     }
                    //     if (!add.areaCode) {
                    //         setErrorAreaCodeMessage('3 number');
                    //         document.getElementById('areaCode').focus();
                    //     }
                    // }}
                    normalize={normalizeInput}
                />
                <Field
                    // disabled={
                    //     !add.phone || !add.areaCode || add.phone.length < 8
                    //         ? true
                    //         : false
                    // }
                    readOnly={!newMember ? false : true}
                    // error={!newMember ? false : true}
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
                    // onFocus={() => {
                    //     console.log(add.areaCode);
                    //     if (add.phone && add.phone.length < 8) {
                    //         setErrorPhone('7 number');
                    //         document.getElementById('phone').focus();
                    //     }
                    //     if (add.phone && add.phone.length === 8) {
                    //         setErrorPhone(null);
                    //     }
                    //     if (!add.phone) {
                    //         setErrorPhone('8 number');
                    //         document.getElementById('phone').focus();
                    //     }
                    // }}
                />
                <Field
                    readOnly={!newMember ? false : true}
                    // error={!newMember ? false : true}
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
                    // error={!newMember ? false : true}
                    readOnly={!newMember ? false : true}
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
                />
                <Form.Input
                    // error={!newMember ? false : true}
                    readOnly={!newMember ? false : true}
                    label='Gallon'
                    name='renewalAmount'
                    className='AreaCode'
                    value={gallonAmount}
                    disabled={!fee}
                    inverted={true}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setGallonAmount(0);
                        } else {
                            setGallonAmount(parseInt(value));
                        }
                    }}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? // ? props.renewWaterGallon(e)
                              //   addNewMembership(e)
                              addNew(e)
                            : null
                    }
                    width={1}
                />
                <Form.Button
                    content='Add Membership'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    // disabled={
                    //     !fee ||
                    //     !gallonAmount ||
                    //     !add.areaCode ||
                    //     !add.phone ||
                    //     !add.firstName ||
                    //     !add.lasName ||
                    //     added
                    // }

                    // gallonLeft,
                    // overGallon,
                    // renew,
                    // renewFee,
                    // lastRenewGallon,
                    // invoiceDate,
                    // invoiceTime,
                    // areaCode,
                    // threeDigit,
                    // fourDigit,

                    disabled={
                        !fee ||
                        !gallonAmount ||
                        !add.areaCode ||
                        !add.phone ||
                        !add.lastName ||
                        !add.firstName
                    }
                    onClick={(e) => {
                        // const updatedGallon = parseInt(remain)

                        setNewMember({
                            // ...add,
                            record_id: record + 1,
                            account: account + 1,
                            firstName: firstName,
                            lastName: lastName,
                            fullname: fullname,
                            memberSince: add.memberSince,
                            phone: add.phone,
                            // prevGallon: 0,
                            prevGallon: gallonAmount,
                            buyGallon: 0,
                            gallonLeft: gallonAmount,
                            overGallon: gallonAmount,
                            // preOver: 0,
                            preOver: gallonAmount,
                            renew: parseInt(gallonAmount),
                            renewFee: parseInt(fee),
                            lastRenewGallon: parseInt(gallonAmount),
                            // invoiceDate: add.invoiceDate,
                            // invoiceTime: add.invoiceTime,
                            invoiceDate: currentDate(),
                            invoiceTime: getCurrentTime(),
                            areaCode: add.areaCode,
                            threeDigit: add.phone.slice(0, 3),
                            fourDigit: add.phone.slice(4, 8),

                            // current: parseInt(currentGallon),
                            // buy: parseInt(buyGallon),
                            // remain: parseInt(remain),
                        });
                        // addNewMembership
                        // setCurrentGallon(gallonAmount);
                        // setRemainGallon(gallonAmount);
                        // setAdded(true);
                        addNew(e);
                        // addNewMembership({
                        //     // ...add,
                        //     record_id: record + 1,
                        //     account: account + 1,
                        //     firstName: firstName,
                        //     lastName: lastName,
                        //     fullname: fullname,
                        //     memberSince: add.memberSince,
                        //     phone: add.phone,
                        //     // prevGallon: 0,
                        //     prevGallon: gallonAmount,
                        //     buyGallon: 0,
                        //     gallonLeft: gallonAmount,
                        //     overGallon: gallonAmount,
                        //     // preOver: 0,
                        //     preOver: gallonAmount,
                        //     renew: parseInt(gallonAmount),
                        //     renewFee: parseInt(fee),
                        //     lastRenewGallon: parseInt(gallonAmount),
                        //     // invoiceDate: add.invoiceDate,
                        //     // invoiceTime: add.invoiceTime,
                        //     invoiceDate: currentDate(),
                        //     invoiceTime: getCurrentTime(),
                        //     areaCode: add.areaCode,
                        //     threeDigit: add.phone.slice(0, 3),
                        //     fourDigit: add.phone.slice(4, 8),
                        // });
                        // handleClick();
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input type='hidden' width={12} />
                <Form.Input
                    // error={!newMember ? false : true}
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
                    disabled={!buyGallon && !added}
                    // disabled={!buyGallon || !added}
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
                            // setBuyGallon(parseInt(value));
                            // setRemainGallon(
                            //     parseInt(currentGallon) - parseInt(value)
                            // );
                        }
                    }}
                    // onChange={props.handleBuyValue}
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
                    // value={props.gallonAfterBuy || 0}
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
            </Form.Group>
        </Form>
    );
};

export default AddForm;
