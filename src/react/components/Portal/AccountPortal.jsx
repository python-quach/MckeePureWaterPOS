import React, { useEffect, useState } from 'react';
import { Button, Message, Form, Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actionTypes from '../../../types';
import { channels } from '../../../shared/constants';

const { ipcRenderer } = window;

const getCurrentTime = () => {
    const time = new Date();
    return time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
};

const currentDate = () => {
    const currentdate = new Date();
    const datetime =
        currentdate.getMonth() +
        1 +
        '/' +
        currentdate.getDate() +
        '/' +
        currentdate.getFullYear();

    return datetime;
};

const AccountPortal = (props) => {
    const { getAccountInvoices, account, detail, printReceipt } = props;
    const { gallonRemain } = detail;
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);

    // BUY DATA
    const [overLimit, setOverLimit] = useState(
        parseInt(gallonRemain) >= 0 ? 0 : gallonRemain
    );
    const [buyGallon, setBuyGallon] = useState(0);
    const [gallonLeft, setGallonLeft] = useState(gallonRemain);
    const [receipt, setReceipt] = useState({
        prevGallon: gallonRemain,
        buyGallon: buyGallon,
        gallonLeft: gallonLeft,
    });

    useEffect(() => {
        console.log(`Buy Data`, {
            prevGallon: gallonRemain,
            buyGallon,
            gallonLeft,
            overLimit,
        });
        if (overLimit < 0) {
            setGallonLeft(0);
        }
        if (buyGallon === '') {
            setGallonLeft(gallonRemain);
        }
        if (parseInt(buyGallon) === parseInt(gallonRemain)) {
            setOverLimit(0);
            setGallonLeft(0);
        }
    }, [buyGallon, gallonLeft, overLimit, gallonRemain, receipt]);

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
                        label='Previous Gallon'
                    />

                    <Form.Input
                        name='buy'
                        width={2}
                        value={buyGallon}
                        label='Buy Gallon'
                        onChange={(e, { value }) => {
                            console.log(value, e);

                            if (isNaN(parseInt(value))) {
                                console.log(value);
                                setBuyGallon(0);
                                setGallonLeft(gallonRemain);
                                setOverLimit(0);
                            }

                            const buyValue = parseInt(value, 10);
                            if (buyValue > gallonRemain) {
                                setOverLimit(gallonRemain - buyValue);
                                setBuyGallon(buyValue);
                            } else {
                                if (buyValue < gallonRemain || buyValue === 0) {
                                    setOverLimit(0);
                                }
                                if (buyValue >= 0 && buyValue <= gallonRemain) {
                                    setBuyGallon((prev) => {
                                        if (buyValue === 0 || buyValue === '') {
                                            setGallonLeft(gallonRemain);
                                        } else {
                                            if (buyValue < gallonRemain)
                                                setGallonLeft(
                                                    gallonRemain - buyValue
                                                );
                                            if (buyValue > gallonRemain)
                                                setGallonLeft(
                                                    buyValue - gallonRemain
                                                );

                                            if (buyValue === gallonRemain) {
                                                setGallonLeft(0);
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
                        error={overLimit < 0 ? true : false}
                        name='over'
                        width={2}
                        value={overLimit}
                        label='Gallon Over'
                        onChange={(e, { value }) => {
                            setOverLimit(value);
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
                        buyGallon,
                        gallonLeft,
                        overLimit,
                        account,
                        detail,
                        timestamp: currentDate() + '-' + getCurrentTime(),
                    };

                    console.log('Receipt Data: ', { receipt });

                    setReceipt(receipt);
                    printReceipt(receipt);
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
        overGallon,
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
            overGallon:
                parseInt(overGallon) === parseInt(gallonRemain)
                    ? 0
                    : overGallon,

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
