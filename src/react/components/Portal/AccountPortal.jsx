import React, { useEffect, useState } from 'react';
import { Button, Message, Form, Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actionTypes from '../../../types';
import { channels } from '../../../shared/constants';
import { getCurrentTime, currentDate } from '../../helpers/helpers';

const { ipcRenderer } = window;

const AccountPortal = (props) => {
    const {
        getAccountInvoices,
        account,
        detail,
        printReceipt,
        getLastRecord,
        buy,
    } = props;
    const { gallonRemain, overGallon } = detail;
    const [test, setTest] = useState(
        detail.gallonRemain === overGallon ? 0 : overGallon
    );
    const [overLimit, setOverLimit] = useState(
        detail.overGallon
        // parseInt(gallonRemain) >= 0 ? 0 : gallonRemain
        // parseInt(overGallon) < 0 ? parseInt(overGallon) : 0
        // parseInt(gallonRemain) > 0 ? 0 : overGallon
    );
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(overGallon);

    // BUY DATA

    const [buyGallon, setBuyGallon] = useState(0);
    const [gallonLeft, setGallonLeft] = useState(gallonRemain);
    const [receipt, setReceipt] = useState({
        prevGallon: gallonRemain,
        buyGallon: buyGallon,
        gallonLeft: gallonLeft,
    });

    // const [purchase, setPurchase] = useState(
    //     {
    //         buy: 0,
    //         left: gallonRemain,
    //         over: parseInt(gallonRemain) >= 0 ? 0 : gallonRemain,
    //     },
    //     setPurchase
    // );

    const resetGallon = () => {
        setOverLimit(0);
        setGallonLeft(0);
    };

    useEffect(() => {
        console.log(`Buy Data`, {
            gallonRemain,
            buyGallon,
            gallonLeft,
            overLimit,
            receipt,
        });
    }, [buyGallon, gallonRemain, gallonLeft, overLimit, receipt]);

    useEffect(() => {
        if (overLimit < 0) setGallonLeft(0);
        if (buyGallon === '') setGallonLeft(gallonRemain);
        if (parseInt(buyGallon) === parseInt(gallonRemain)) resetGallon();
    }, [buyGallon, overLimit, gallonRemain]);

    return (
        <Container style={{ width: '1400px' }}>
            <Form size='huge'>
                <Form.Group>
                    <Field
                        name='todayDate'
                        component={Form.Input}
                        width={3}
                        label='Today Date'
                    />
                    <Field
                        name='todayTime'
                        component={Form.Input}
                        width={3}
                        label='Time'
                    />
                    <Field
                        name='account'
                        width={2}
                        component={Form.Input}
                        label='Account'
                    />
                    <Field
                        name='areaCode'
                        width={2}
                        component={Form.Input}
                        label='Area Code'
                    />
                    <Field
                        name='phone'
                        type='phone'
                        width={3}
                        component={Form.Input}
                        label='Phone Number'
                    />
                    <Field
                        name='firstName'
                        width={2}
                        component={Form.Input}
                        label='First Name'
                    />
                    <Field
                        name='lastName'
                        width={2}
                        component={Form.Input}
                        label='Last Name'
                    />
                    <Field
                        name='fullname'
                        width={2}
                        component={Form.Input}
                        label='FullName'
                    />
                </Form.Group>
                <Form.Group>
                    <Field
                        readOnly
                        name='prevGallon'
                        width={2}
                        component={Form.Input}
                        label='Gallon Remain'
                    />

                    <Form.Input
                        name='buy'
                        width={2}
                        value={buyGallon}
                        label='Buy Gallon'
                        onChange={(e, { value }) => {
                            if (isNaN(parseInt(value))) {
                                console.log(value);
                                setBuyGallon(0);
                                setGallonLeft(gallonRemain);
                                setOverLimit(0);
                                // setTest(detail.overGallon);
                                // if(test < 0)
                                // if (test <= 0) {
                                if (test < 0) {
                                    setTest(detail.overGallon);
                                } else {
                                    // setTest(0);
                                    setTest(
                                        detail.gallonRemain - detail.overGallon
                                    );
                                }
                            }

                            const buyValue = parseInt(value, 10);
                            if (buyValue > gallonRemain) {
                                setOverLimit(gallonRemain - buyValue);
                                // setTest(gallonRemain - buyValue);
                                setTest(detail.overGallon - buyValue);

                                setBuyGallon(buyValue);
                            } else {
                                if (buyValue < gallonRemain || buyValue === 0) {
                                    setOverLimit(0);
                                    setTest(detail.overGallon);
                                }
                                if (buyValue >= 0 && buyValue <= gallonRemain) {
                                    setBuyGallon((prev) => {
                                        if (buyValue === 0 || buyValue === '') {
                                            setGallonLeft(gallonRemain);
                                            // setTest(detail.overGallon);
                                            if (test <= 0) {
                                                setTest(buyGallon - test);
                                            } else {
                                                setTest(0);
                                            }
                                        } else {
                                            if (buyValue < gallonRemain)
                                                setGallonLeft(
                                                    gallonRemain - buyValue
                                                );
                                            setTest(0);
                                            if (buyValue > gallonRemain)
                                                setGallonLeft(
                                                    buyValue - gallonRemain
                                                );

                                            if (buyValue === gallonRemain) {
                                                setGallonLeft(0);
                                                // setTest(detail.overGallon);
                                                if (test < 0) {
                                                    // if (test <= 0) {
                                                    setTest(buyGallon - test);
                                                } else {
                                                    setTest(0);
                                                }
                                            }
                                        }
                                        setBuyGallon(parseInt(value));
                                    });
                                }
                            }
                        }}
                    />
                    <Form.Input
                        error={
                            gallonLeft === 0 || gallonLeft < 0 ? true : false
                        }
                        width={2}
                        readOnly
                        name='GallonLeft'
                        value={gallonLeft}
                        label='Gallon After Buy'
                    />
                    {/* <Form.Input
                        readOnly
                        error={overLimit < 0 ? true : false}
                        name='over'
                        width={2}
                        value={overLimit}
                        // defaultValue={overLimit}
                        label='Gallon Over'
                        onChange={(e, { value }) => {
                            setOverLimit(value);
                        }}
                    /> */}
                    <Form.Input
                        readOnly
                        error={test < 0 ? true : false}
                        name='test'
                        width={2}
                        value={test}
                        // defaultValue={overLimit}
                        label='Gallon Over Test'
                        onChange={(e, { value }) => {
                            // setOverLimit(value);
                            setTest(value);
                        }}
                    />
                </Form.Group>
            </Form>
            <Divider />
            <Button
                onClick={() => {
                    if (props.membership.members) {
                        props.history.push('/member');
                    } else {
                        props.history.push('find');
                    }
                }}>
                Back
            </Button>
            <Button
                loading={loading}
                onClick={() => {
                    console.log(account);
                    setLoading(true);
                    getAccountInvoices(account, (data) => {
                        console.log(data);
                        setLoading(false);
                        setInvoices(data);
                    });
                }}>
                Get Invoice
            </Button>
            <Button
                loading={loading}
                onClick={() => {
                    console.log(account);
                    setLoading(true);
                    getAccountInvoices(account, (data) => {
                        console.log(data);
                        setLoading(false);
                        setInvoices(data);
                    });
                }}>
                Renew Membership
            </Button>
            <Button
                content='Buy'
                onClick={() => {
                    const receipt = {
                        prevGallon: gallonRemain,
                        buyGallon: buyGallon,
                        gallonLeft,
                        overLimit,
                        account,
                        detail,
                        timestamp: currentDate() + '-' + getCurrentTime(),
                    };

                    console.log('Receipt Data: ', receipt);

                    setReceipt(receipt);

                    getLastRecord((lastRecord) => {
                        printReceipt({
                            ...receipt,
                            record_id: lastRecord.record_id,
                            barcode: lastRecord.barcode,
                        });
                    });

                    // printReceipt(receipt);
                }}
            />
            <Button
                content='Update'
                onClick={() => {
                    getLastRecord((lastRecord) => {
                        // const new_purchase = {
                        //     record_id: lastRecord.record_id,
                        //     barcode: lastRecord.barcode,
                        //     account: detail.account,
                        //     fullname: detail.fullname,
                        //     phone: detail.phone,
                        //     memberSince: detail.memberSince,
                        //     prevGallon: gallonRemain,
                        //     buyGallon: buyGallon,
                        //     gallonLeft: gallonLeft,
                        //     overLimit: overLimit,
                        //     timestamp: currentDate() + '-' + getCurrentTime(),
                        //     detail: detail,
                        // };

                        const insertData = {
                            record_id: parseInt(lastRecord.record_id) + 1,
                            account: detail.account,
                            firstName: detail.firstName,
                            lastName: detail.lastName,
                            fullname: detail.fullname,
                            memberSince: detail.memberSince,
                            phone: detail.phone,
                            prevGallon: parseInt(detail.gallonRemain),
                            buyGallon: parseInt(buyGallon),
                            gallonLeft: parseInt(gallonLeft),
                            // overGallon: overLimit,
                            overGallon: test,
                            renew: null,
                            renewFee: 0,
                            lastRenewGallon: detail.lastRenewGallon,
                            invoiceDate: currentDate(),
                            invoiceTime: getCurrentTime(),
                            areaCode: detail.areaCode,
                            threeDigit: detail.field6,
                            fourDigit: detail.field7,
                        };

                        // console.log({ new_purchase });
                        console.log({ insertData });
                        buy(insertData, (data) => {
                            console.log(data);
                            props.history.push('/member');
                        });
                    });
                }}
            />
            <Message>
                <Message.Content>
                    <pre>{JSON.stringify(account || [], null, 2)}</pre>
                    <pre>{JSON.stringify(detail || [], null, 2)}</pre>
                    <pre>{JSON.stringify(invoices || [], null, 2)}</pre>
                </Message.Content>
            </Message>
        </Container>
    );
};

const mapStateToProps = (state) => {
    const {
        account,
        areaCode,
        firstName,
        phone,
        fullname,
        gallonBuy,
        gallonCurrent,
        gallonRemain,
        invoiceDate,
        invoiceTime,
        lastName,
        lastRenewGallon,
        memberSince,
        // overGallon,
        record_id,
        renew,
        renewFee,
    } = state.account;
    return {
        initialValues: {
            account,
            areaCode,
            firstName,
            phone,
            fullname,
            gallonBuy,
            gallonCurrent,
            gallonRemain,
            invoiceDate,
            invoiceTime,
            lastName,
            lastRenewGallon,
            memberSince,

            prevGallon: parseInt(gallonRemain) || 0,
            // overGallon: overGallon,
            // parseInt(overGallon) === parseInt(gallonRemain)
            //     ? 0
            //     : overGallon,

            record_id,
            renew,
            renewFee,
            todayDate: currentDate(),
            todayTime: getCurrentTime(),
        },
        membership: state.membership,
        account: state.account.account,
        detail: state.account,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        printReceipt: (receipt, callback) => {
            ipcRenderer.send(channels.PRINT_RECEIPT, { receipt });

            ipcRenderer.on(channels.PRINT_RECEIPT, (event, args) => {
                ipcRenderer.removeAllListeners(channels.PRINT_RECEIPT);
            });
        },
        buy: (data, callback) => {
            ipcRenderer.send(channels.BUY_WATER, data);
            ipcRenderer.on(channels.BUY_WATER, (event, args) => {
                ipcRenderer.removeAllListeners(channels.BUY_WATER);
                callback(args);
            });
        },
        getLastRecord: (callback) => {
            ipcRenderer.send(channels.LAST_RECORD);
            ipcRenderer.on(channels.LAST_RECORD, (event, lastRecord) => {
                ipcRenderer.removeAllListeners(channels.LAST_RECORD);
                dispatch({
                    type: actionTypes.LAST_RECORD,
                    payload: lastRecord,
                });
                callback(lastRecord);
            });
        },
        getAccountInvoices: (account, callback) => {
            ipcRenderer.send(channels.GET_MEMBER_INVOICES, {
                account,
            });
            ipcRenderer.on(channels.GET_MEMBER_INVOICES, (event, args) => {
                ipcRenderer.removeAllListeners(channels.GET_MEMBER_INVOICES);
                console.log({ args });
                dispatch({
                    type: actionTypes.GET_MEMBER_INVOICES,
                    payload: args,
                });
                callback(args);
            });
        },
    };
};

const ReduxForm = reduxForm({ form: 'buy' })(AccountPortal);
export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
