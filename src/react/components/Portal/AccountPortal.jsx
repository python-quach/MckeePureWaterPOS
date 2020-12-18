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
        getAccount,
        buy,
        renew,
    } = props;
    const { gallonRemain, overGallon } = detail;
    const [test, setTest] = useState(
        detail.gallonRemain === overGallon ? 0 : overGallon
    );
    const [overLimit, setOverLimit] = useState(detail.overGallon);
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);

    const [renewGallon, setRenewGallon] = useState(0);
    const [renewFee, setRenewFee] = useState(25);

    // TEST BUY
    // const [currentGallon, setCurrentGallon] = useState(gallonRemain);
    const [currentGallon, setCurrentGallon] = useState(
        detail.gallonCurrent - detail.gallonBuy
    );
    const [gallonBuy, setGallonBuy] = useState(0);
    const [gallonAfterBuy, setGallonAfterBuy] = useState(gallonRemain);
    const [gallonOver, setGallonOver] = useState(
        gallonRemain < 0 ? gallonRemain : 0
    );

    // BUY DATA

    const [buyGallon, setBuyGallon] = useState(0);
    const [gallonLeft, setGallonLeft] = useState(gallonRemain);
    const [receipt, setReceipt] = useState({
        prevGallon: gallonRemain,
        buyGallon: buyGallon,
        gallonLeft: gallonLeft,
    });

    // RENEW DATA
    const [renewalFee, setRenewalFee] = useState(0);
    const [renewAmount, setRenewAmount] = useState(0);

    const resetGallon = () => {
        setOverLimit(0);
        setGallonLeft(0);
    };

    // useEffect(() => {
    //     console.log(`Buy Data`, {
    //         gallonRemain,
    //         buyGallon,
    //         gallonLeft,
    //         overLimit,
    //         receipt,
    //     });
    // }, [buyGallon, gallonRemain, gallonLeft, overLimit, receipt]);

    useEffect(() => {
        console.log(`Purchase Data:`, {
            currentGallon,
            gallonBuy,
            gallonAfterBuy,
            gallonOver,
        });
    }, [currentGallon, gallonBuy, gallonAfterBuy, gallonOver]);

    useEffect(() => {
        if (gallonAfterBuy < 0) {
            setGallonOver(gallonAfterBuy);
            // setGallonAfterBuy(0);
        } else {
            if (gallonBuy === 0) {
                setGallonAfterBuy(gallonRemain);
                setGallonOver(0);
            }
        }
        console.log(`Purchase Data:`, {
            currentGallon,
            gallonBuy,
            gallonAfterBuy,
            gallonOver,
        });
    }, [currentGallon, gallonBuy, gallonAfterBuy, gallonOver, gallonRemain]);

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
                    <Form.Input
                        width={2}
                        error
                        readOnly
                        label='Current Gallon'
                        name='currentGallon'
                        value={currentGallon || 0}
                        onChange={(e, { value }) => {
                            console.log('currentGallon', value);
                            setCurrentGallon(value);
                        }}
                    />
                    <Form.Input
                        width={2}
                        error
                        label='Gallon Buy'
                        name='gallonBuy'
                        value={gallonBuy}
                        onChange={(e, { value }) => {
                            console.log('gallonBuy', value);
                            if (isNaN(parseInt(value))) {
                                setGallonBuy(0);
                                setGallonAfterBuy(gallonRemain);
                            } else {
                                setGallonBuy(parseInt(value));
                                setGallonAfterBuy(
                                    parseInt(gallonRemain) - parseInt(value)
                                );
                                console.log('afterBuyGallon', gallonAfterBuy);
                            }
                        }}
                    />
                    <Form.Input
                        width={2}
                        readOnly
                        error
                        label='Gallon Remain'
                        value={gallonAfterBuy}
                        onChange={(e, { value }) => {
                            console.log('gallonAfterBuy', value);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width={2}
                        error
                        label='Renew Fee'
                        name='renewalFee'
                        value={renewalFee}
                        onChange={(e, { value }) => {
                            console.log(value);
                            if (isNaN(parseInt(value))) {
                                setRenewalFee(0);
                            } else {
                                setRenewalFee(parseInt(value));
                            }
                        }}
                    />
                    <Form.Input
                        width={2}
                        error
                        label='Renew Gallon'
                        name='renewalAmount'
                        value={renewAmount}
                        onChange={(e, { value }) => {
                            console.log(value);
                            if (isNaN(parseInt(value))) {
                                setRenewAmount(0);
                            } else {
                                setRenewAmount(parseInt(value));
                            }
                        }}
                    />
                </Form.Group>
                {/* <Form.Group>
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
                                if (test < 0) {
                                    setTest(detail.overGallon);
                                } else {
                                    setTest(0);
                                    // setTest(
                                    //     detail.gallonRemain - detail.overGallon
                                    // );
                                }
                            }

                            const buyValue = parseInt(value, 10);
                            if (buyValue > gallonRemain) {
                                setOverLimit(gallonRemain - buyValue);
                                // setTest(detail.overGallon - buyValue);
                                setTest(detail.gallonRemain - buyValue);
                                setBuyGallon(buyValue);
                            } else {
                                if (buyValue < gallonRemain || buyValue === 0) {
                                    setOverLimit(0);

                                    if (detail.overGallon > 0) {
                                        setTest(detail.overGallon);
                                    } else {
                                        setTest(0);
                                    }
                                    // setTest(detail.overGallon);
                                }
                                if (buyValue >= 0 && buyValue <= gallonRemain) {
                                    setBuyGallon((prev) => {
                                        if (buyValue === 0 || buyValue === '') {
                                            setGallonLeft(gallonRemain);
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
                                                if (test < 0) {
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

                    <Form.Input
                        readOnly
                        error={test < 0 ? true : false}
                        name='test'
                        width={2}
                        value={test}
                        label='Gallon Over Test'
                        onChange={(e, { value }) => {
                            setTest(value);
                        }}
                    />
                    <Form.Input
                        name='renew'
                        label='renew'
                        value={renewGallon}
                        width={2}
                        onChange={(e, { value }) => {
                            setRenewGallon(value);
                        }}
                    />
                    <Form.Input
                        name='fee'
                        label='fee'
                        value={renewFee}
                        width={2}
                        onChange={(e, { value }) => {
                            setRenewGallon(value);
                        }}
                    />
                </Form.Group> */}
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
                // loading={loading}
                onClick={() => {
                    getLastRecord((lastRecord) => {
                        const insertData = {
                            record_id: parseInt(lastRecord.record_id) + 1,
                            account: detail.account,
                            firstName: detail.firstName,
                            lastName: detail.lastName,
                            fullname: detail.fullname,
                            memberSince: detail.memberSince,
                            phone: detail.phone,
                            // prevGallon: parseInt(detail.gallonRemain),
                            // gallonCurrent:
                            //     parseInt(test) + parseInt(renewGallon),
                            prevGallon: parseInt(test) + parseInt(renewGallon),
                            buyGallon: 0,
                            gallonLeft: parseInt(test) + parseInt(renewGallon),
                            // overGallon: overLimit,
                            overGallon: parseInt(test) + parseInt(renewGallon),
                            renew: parseInt(renewGallon),
                            renewFee: parseInt(renewFee),
                            // lastRenewGallon: detail.lastRenewGallon,
                            lastRenewGallon: parseInt(renewGallon),
                            invoiceDate: currentDate(),
                            invoiceTime: getCurrentTime(),
                            areaCode: detail.areaCode,
                            threeDigit: detail.field6,
                            fourDigit: detail.field7,
                        };

                        console.log({ insertData });
                        buy(insertData, (data) => {
                            console.log(data);
                            props.history.push('/member');
                        });
                    });
                    // console.log(account);
                    // setLoading(true);
                    // getAccountInvoices(account, (data) => {
                    //     console.log(data);
                    //     setLoading(false);
                    //     setInvoices(data);
                    // });
                }}>
                Renew Membership
            </Button>

            <Button
                content='Buy'
                onClick={() => {
                    getLastRecord((lastRecord) => {
                        console.log({ currentGallon });
                        const insertData = {
                            record_id: parseInt(lastRecord.record_id) + 1,
                            account: detail.account,
                            firstName: detail.firstName,
                            lastName: detail.lastName,
                            fullname: detail.fullname,
                            memberSince: detail.memberSince,
                            phone: detail.phone,
                            prevGallon: parseInt(detail.gallonRemain),
                            buyGallon: parseInt(gallonBuy),
                            gallonLeft: parseInt(gallonAfterBuy),
                            overGallon: parseInt(gallonAfterBuy),
                            renew: 0,
                            renewFee: 0,
                            lastRenewGallon: detail.lastRenewGallon,
                            invoiceDate: currentDate(),
                            invoiceTime: getCurrentTime(),
                            areaCode: detail.areaCode,
                            threeDigit: detail.field6,
                            fourDigit: detail.field7,
                        };

                        console.log({ insertData });
                        buy(insertData, (data) => {
                            console.log(data);
                            props.history.push('/member');
                        });
                    });
                }}
            />
            <Button
                content='Renew'
                onClick={(e) => {
                    e.preventDefault();
                    console.log({ renewalFee, renewAmount });

                    getLastRecord((lastRecord) => {
                        const insertData = {
                            record_id: parseInt(lastRecord.record_id) + 1,
                            account: detail.account,
                            firstName: detail.firstName,
                            lastName: detail.lastName,
                            fullname: detail.fullname,
                            memberSince: detail.memberSince,
                            phone: detail.phone,
                            prevGallon:
                                parseInt(gallonRemain) + parseInt(renewAmount),
                            buyGallon: 0,
                            gallonLeft:
                                parseInt(gallonRemain) + parseInt(renewAmount),
                            overGallon:
                                parseInt(gallonRemain) + parseInt(renewAmount),
                            preOver: detail.overGallon,
                            renew: parseInt(renewAmount),
                            renewFee: parseInt(renewalFee),
                            lastRenewGallon: parseInt(renewAmount),
                            invoiceDate: currentDate(),
                            invoiceTime: getCurrentTime(),
                            areaCode: detail.areaCode,
                            threeDigit: detail.field6,
                            fourDigit: detail.field7,
                        };

                        console.log({ insertData });
                        renew(insertData, (data) => {
                            console.log(data);
                            getAccount(account, (data) => {
                                setCurrentGallon(data.gallonCurrent);
                                setGallonBuy(0);
                                setGallonAfterBuy(data.gallonRemain);
                                setRenewAmount(0);
                                setRenewalFee(0);
                                console.log(data);
                            });
                            // props.history.push('/member');
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
        renew: (data, callback) => {
            ipcRenderer.send(channels.RENEW_WATER, data);
            ipcRenderer.on(channels.RENEW_WATER, (event, args) => {
                ipcRenderer.removeAllListeners(channels.RENEW_WATER);
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
        getAccount: (account, callback) => {
            ipcRenderer.send(channels.GET_ACCOUNT, { account });

            ipcRenderer.on(channels.GET_ACCOUNT, (event, response) => {
                ipcRenderer.removeAllListeners(channels.GET_ACCOUNT);
                // console.log(response);
                dispatch({ type: actionTypes.GET_ACCOUNT, payload: response });
                callback(response);
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
