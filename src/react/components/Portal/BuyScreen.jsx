import React, { useEffect, useState } from 'react';
import {
    Button,
    Message,
    Form,
    Divider,
    TransitionablePortal,
    Segment,
    Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actionTypes from '../../../types';
import { channels } from '../../../shared/constants';
import { getCurrentTime, currentDate } from '../../helpers/helpers';

const { ipcRenderer } = window;

const BuyScreen = (props) => {
    const [open, setOpenPortal] = useState(true);
    const {
        getAccountInvoices,
        account,
        detail,
        getLastRecord,
        getAccount,
        buy,
        renew,
    } = props;

    const handleClose = () => {
        setOpenPortal(false);
        props.history.push('/find');
    };

    const [date, setCurrentDate] = useState(currentDate());
    const [time, setCurrentTime] = useState(getCurrentTime());

    const { gallonRemain } = detail;
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);

    const [currentGallon, setCurrentGallon] = useState(detail.gallonRemain);

    const [gallonBuy, setGallonBuy] = useState(0);
    const [gallonAfterBuy, setGallonAfterBuy] = useState(gallonRemain);
    const [gallonOver, setGallonOver] = useState(
        gallonRemain < 0 ? gallonRemain : 0
    );

    const [renewalFee, setRenewalFee] = useState(0);
    const [renewAmount, setRenewAmount] = useState(0);

    const [disableBuyInput, setDisableBuyInput] = useState(true);

    const [disableRenewButton, setDisabledRenewButton] = useState(true);
    const [disableRenewInput, setDisabledRenewInput] = useState(true);

    const resetRenewData = (data) => {
        setCurrentGallon(data.gallonCurrent);
        setGallonBuy(0);
        setGallonAfterBuy(data.gallonRemain);
        setRenewAmount(0);
        setRenewalFee(0);
        setCurrentDate(currentDate());
        setCurrentTime(getCurrentTime);
    };

    const resetBuyData = (data) => {
        setCurrentGallon(data.gallonRemain);
        setGallonBuy(0);
        setGallonAfterBuy(data.gallonRemain);
        setCurrentDate(currentDate());
        setCurrentTime(getCurrentTime);
    };

    const renewWaterGallon = (e) => {
        e.preventDefault();
        getLastRecord((lastRecord) => {
            const updateGallon = parseInt(gallonRemain) + parseInt(renewAmount);
            const renewData = {
                record_id: parseInt(lastRecord.record_id) + 1,
                account: detail.account,
                firstName: detail.firstName,
                lastName: detail.lastName,
                fullname: detail.fullname,
                memberSince: detail.memberSince,
                phone: detail.phone,
                prevGallon: updateGallon,
                buyGallon: 0,
                gallonLeft: updateGallon,
                overGallon: updateGallon,
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

            renew(renewData, () => {
                getAccount(account, (currentRecord) => {
                    resetRenewData(currentRecord);
                });
            });
        });
    };

    const buyWaterGallon = (e) => {
        if (gallonBuy > 0) {
            e.preventDefault();
            getLastRecord((lastRecord) => {
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
                buy(insertData, () => {
                    getAccount(account, (data) => {
                        resetBuyData(data);
                    });
                });
            });
        }
    };

    const handleBuyValue = (e, { value }) => {
        if (isNaN(parseInt(value))) {
            setGallonBuy(0);
            setGallonAfterBuy(gallonRemain);
        } else {
            setGallonBuy(parseInt(value));
            setGallonAfterBuy(parseInt(gallonRemain) - parseInt(value));
            console.log('afterBuyGallon', gallonAfterBuy);
        }
    };

    const handleRenewalFee = (e, { value }) => {
        if (isNaN(parseInt(value))) {
            setRenewalFee(0);
        } else {
            setRenewalFee(parseInt(value));
        }
    };

    const handleRenewalAmount = (e, { value }) => {
        console.log(value);
        if (isNaN(parseInt(value))) {
            setRenewAmount(0);
        } else {
            setRenewAmount(parseInt(value));
        }
    };

    useEffect(() => {
        console.log(`Purchase Data:`, {
            currentGallon,
            gallonBuy,
            gallonAfterBuy,
            gallonOver,
        });
    }, [currentGallon, gallonBuy, gallonAfterBuy, gallonOver]);

    // useEffect(() => {
    //     if (gallonAfterBuy < 0) {
    //         setGallonOver(gallonAfterBuy);
    //     } else {
    //         if (gallonBuy === 0) {
    //             setGallonAfterBuy(gallonRemain);
    //             setGallonOver(0);
    //         }
    //     }
    // }, [currentGallon, gallonBuy, gallonAfterBuy, gallonOver, gallonRemain]);

    useEffect(() => {
        if (gallonAfterBuy < 0) {
            setGallonOver(gallonAfterBuy);
        } else {
            if (gallonBuy === 0) {
                setGallonAfterBuy(gallonRemain);
                setGallonOver(0);
            }
        }
        setDisabledRenewButton(
            gallonRemain <= 0 && renewAmount > 0 && renewalFee > 0
                ? false
                : true
        );
        setDisabledRenewInput(gallonRemain > 0 ? true : false);
        setDisableBuyInput(currentGallon > 0 ? false : true);
        // }, [gallonRemain, renewAmount, renewalFee, currentGallon]);
    }, [
        gallonRemain,
        renewAmount,
        renewalFee,
        currentGallon,
        gallonAfterBuy,
        gallonBuy,
    ]);

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
                        <Form>
                            <Form.Group>
                                <Form.Input
                                    name='todayDate'
                                    label='Today Date'
                                    value={date}
                                    className='TodayDate'
                                    inverted={true}
                                    icon='calendar'
                                    placeholder='mm/dd/yyyy'
                                    iconPosition='left'
                                    readOnly
                                    width={2}
                                />
                                <Form.Input
                                    name='todayTime'
                                    label='Current Time'
                                    value={time}
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
                                    className='TodayDate'
                                    placeholder='xxxxxxx'
                                    component={Form.Input}
                                    inverted={true}
                                    icon='hashtag'
                                    iconPosition='left'
                                    width={2}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Field
                                    className='AreaCode'
                                    inverted={true}
                                    name='areaCode'
                                    width={1}
                                    readonly
                                    placeholder='xxx'
                                    component={Form.Input}
                                    label='Area Code'
                                />
                                <Field
                                    readOnly
                                    className='PhoneNumber'
                                    inverted={true}
                                    name='phone'
                                    placeholder='xxx-xxxx'
                                    width={2}
                                    component={Form.Input}
                                    label='Phone Number'
                                />

                                <Field
                                    className='Test'
                                    inverted={true}
                                    name='fullname'
                                    width={3}
                                    component={Form.Input}
                                    label='Customer Name'
                                />
                                <Form.Input type='hidden' width={7} />
                                <Form.Input
                                    className='AreaCode'
                                    width={1}
                                    readOnly
                                    inverted={true}
                                    label='Current'
                                    name='currentGallon'
                                    value={currentGallon || 0}
                                />
                                <Form.Input
                                    name='gallonBuy'
                                    label='Buy'
                                    className='AreaCode'
                                    value={gallonBuy}
                                    disabled={disableBuyInput}
                                    inverted={true}
                                    width={1}
                                    onChange={handleBuyValue}
                                    onKeyPress={(e) =>
                                        e.key === 'Enter' || e.keyCode === 13
                                            ? buyWaterGallon(e)
                                            : null
                                    }
                                />
                                <Form.Input
                                    className={
                                        gallonBuy > currentGallon
                                            ? 'Remain'
                                            : 'AreaCode'
                                    }
                                    width={1}
                                    readOnly
                                    type='text'
                                    inverted={true}
                                    label='Remain'
                                    value={gallonAfterBuy || 0}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input type='hidden' width={13} />
                                <Form.Input
                                    label='Renew Fee'
                                    name='renewalFee'
                                    className='AreaCode'
                                    value={renewalFee}
                                    disabled={disableRenewInput}
                                    inverted={true}
                                    onChange={handleRenewalFee}
                                    width={1}
                                />
                                <Form.Input
                                    label='Renew Gallon'
                                    name='renewalAmount'
                                    className='AreaCode'
                                    value={renewAmount}
                                    disabled={disableRenewInput}
                                    inverted={true}
                                    onChange={handleRenewalAmount}
                                    width={1}
                                />
                                <Form.Button
                                    content='Renew'
                                    style={{ marginTop: '30px' }}
                                    color='blue'
                                    disabled={disableRenewButton}
                                    onClick={renewWaterGallon}
                                    width={1}
                                />
                            </Form.Group>
                        </Form>
                        <Divider />
                        <Button
                            onClick={() => {
                                if (props.membership.members) {
                                    setOpenPortal(false);
                                    props.history.push('/member');
                                } else {
                                    setOpenPortal(false);
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
                            color='green'
                            disabled={
                                currentGallon > 0 && gallonBuy >= 1
                                    ? false
                                    : true
                            }
                            floated='right'
                            content='Buy'
                            onClick={buyWaterGallon}
                        />

                        {/* <Message>
                            <Message.Content>
                                <pre>
                                    {JSON.stringify(account || [], null, 2)}
                                </pre>
                                <pre>
                                    {JSON.stringify(detail || [], null, 2)}
                                </pre>
                                <pre>
                                    {JSON.stringify(invoices || [], null, 2)}
                                </pre>
                            </Message.Content>
                        </Message> */}
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
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
            record_id: record_id ? parseInt(record_id) + 1 : '',
            renew,
            renewFee,
            // todayDate: currentDate(),
            // todayTime: getCurrentTime(),
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

const ReduxForm = reduxForm({ form: 'buy', enableReinitialize: true })(
    BuyScreen
);
export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
