import React, { useEffect, useState } from 'react';
import { Button, Message, Form, Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actionTypes from '../../../types';
import { channels } from '../../../shared/constants';
import BuyForm from '../BuyForm';

const { ipcRenderer } = window;

const AccountPortal = (props) => {
    const { getAccountInvoices, account, detail } = props;
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);

    // BUY DATA
    const [overLimit, setOverLimit] = useState(
        parseInt(detail.overGallon) === parseInt(detail.gallonRemain)
            ? 0
            : detail.overGallon
    );
    const [buyGallon, setBuyGallon] = useState(0);
    const [gallonLeft, setGallonLeft] = useState(detail.gallonRemain);

    useEffect(() => {
        console.log(`Buy Data`, { buyGallon, gallonLeft, overLimit });
    }, [buyGallon, gallonLeft, overLimit]);

    return (
        <Container style={{ width: '1400px' }}>
            <Form size='huge'>
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
                    width={2}
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
                    readOnly
                    name='prevGallon'
                    width={2}
                    component={Form.Input}
                    label='Previous Gallon'
                />

                <Form.Input
                    type='number'
                    name='buy'
                    width={2}
                    value={buyGallon ? buyGallon.toString() : buyGallon}
                    label='Buy Gallon'
                    onChange={(e, { value }) => {
                        console.log(value);
                        if (isNaN(parseInt(value))) {
                            setBuyGallon('');
                            setOverLimit(0);
                        }
                        const buyValue = parseInt(value, 10);
                        // console.log({
                        //     value: buyValue,
                        //     remain: detail.gallonRemain,
                        //     overLimit,
                        // });
                        if (buyValue > detail.gallonRemain) {
                            setOverLimit(detail.gallonRemain - buyValue);
                            setBuyGallon(buyValue);
                        } else {
                            if (
                                buyValue < detail.gallonRemain ||
                                buyValue === 0
                            ) {
                                setOverLimit(0);
                            }
                            if (
                                buyValue >= 0 &&
                                buyValue <= detail.gallonRemain
                            ) {
                                setBuyGallon((prev) => {
                                    if (buyValue === 0 || buyValue === '') {
                                        setGallonLeft(detail.gallonRemain);
                                    } else {
                                        setGallonLeft(
                                            buyValue - detail.gallonRemain
                                        );
                                    }
                                    setBuyGallon(parseInt(value));
                                });
                            }
                        }
                    }}
                />
                <Form.Input
                    error={gallonLeft === 0 || gallonLeft < 0 ? true : false}
                    width={2}
                    readOnly
                    name='GallonLeft'
                    value={gallonLeft}
                    label='Gallon Left'
                />
                <Form.Input
                    readOnly
                    error={overLimit < 0 ? true : false}
                    name='over'
                    width={2}
                    value={overLimit}
                    label='Over Gallon'
                    onChange={(e, { value }) => {
                        setOverLimit(value);
                    }}
                />
                {/* <Field
                    name='total'
                    readOnly
                    label='Total Gallon'
                    component={Form.Input}
                    width={2}
                /> */}
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
            <Message>
                <Message.Content>
                    {/* <pre>{JSON.stringify(account || [], null, 2)}</pre> */}
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
            // total: gallonRemain,
            // totalGallon: 10,
        },
        membership: state.membership,
        account: state.account.account,
        detail: state.account,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
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

// export default connect(mapStateToProps, mapDispatchToProps)(AccountPortal);
export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
