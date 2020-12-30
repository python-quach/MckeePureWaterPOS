import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    TransitionablePortal,
    Segment,
    Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getCurrentTime, currentDate } from '../../helpers/helpers';
import BuyForm from './BuyForm';
import BuyReceipt from './BuyReceipt';
import RenewReceipt from './RenewReceipt';
import Debug from '../Debug/DebugMessage';
import * as actions from '../../../actions';

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
        clearAccount,
        clearMembership,
        clearFindForm,
        history,
        changeName,
        formBuy,
    } = props;

    const { gallonRemain } = detail;

    const handleClose = () => {
        clearAccount();
        clearMembership();
        clearFindForm();
        setOpenPortal(false);
        history.push('/find');
    };

    const [edited, setEdited] = useState(false);

    const [date, setCurrentDate] = useState(currentDate());
    const [time, setCurrentTime] = useState(getCurrentTime());
    // const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentGallon, setCurrentGallon] = useState(gallonRemain);
    const [gallonBuy, setGallonBuy] = useState(0);
    const [gallonAfterBuy, setGallonAfterBuy] = useState(gallonRemain);
    const [gallonOver, setGallonOver] = useState(gallonRemain);
    const [renewalFee, setRenewalFee] = useState(0);
    const [renewAmount, setRenewAmount] = useState(0);
    const [disabledBuyButton, setDisabledBuyButton] = useState(true);
    const [disableBuyInput, setDisableBuyInput] = useState(true);
    const [disableRenewButton, setDisabledRenewButton] = useState(true);
    const [disableRenewInput, setDisabledRenewInput] = useState(true);

    const resetRenewData = ({ gallonCurrent, gallonRemain }) => {
        setCurrentGallon(gallonCurrent);
        setGallonBuy(0);
        setGallonAfterBuy(gallonRemain);
        setRenewAmount(0);
        setRenewalFee(0);
        setCurrentDate(currentDate());
        setCurrentTime(getCurrentTime);
    };

    const resetBuyData = ({ gallonRemain }) => {
        setCurrentGallon(gallonRemain);
        setGallonBuy(0);
        setGallonAfterBuy(gallonRemain);
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

    const handleGetInvoices = () => {
        console.log(account);
        setLoading(true);
        getAccountInvoices(account, (data) => {
            console.log(data);
            setLoading(false);
            // setInvoices(data);
        });
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

    const handleBackButton = () => {
        if (props.membership.members) {
            props.clearAccount();
            props.clearMembership();
            props.clearFindForm();
            setOpenPortal(false);
            props.history.push('/find');
        } else {
            props.clearAccount();
            props.clearMembership();
            props.clearFindForm();
            setOpenPortal(false);
            props.history.push('/find');
        }
    };

    useEffect(() => {
        console.log(`Purchase Data:`, {
            currentGallon,
            gallonBuy,
            gallonAfterBuy,
            gallonOver,
        });

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

        setDisabledBuyButton(
            currentGallon > 0 && gallonBuy >= 1 ? false : true
        );

        setDisabledRenewInput(gallonRemain > 0 ? true : false);
        setDisableBuyInput(currentGallon > 0 ? false : true);
    }, [
        gallonRemain,
        renewAmount,
        renewalFee,
        currentGallon,
        gallonAfterBuy,
        gallonBuy,
        gallonOver,
    ]);

    useEffect(() => {
        if (!edited) {
            document.getElementById('buy').focus();
        }
        // document.getElementById('buy').focus();
    });

    useEffect(() => {
        if (disabledBuyButton && renewAmount === 0) {
            document.getElementById('renew').focus();
        }
    });

    useEffect(() => {
        if (!account) {
            props.history.push('/find');
        }
    });

    useEffect(() => {
        console.log({ edited });
        if (edited) {
            document.getElementById('areaCode').focus();
        }
    }, [edited]);

    useEffect(() => {
        changeName(formBuy.firstName + ' ' + formBuy.lastName);
    }, [changeName, formBuy.firstName, formBuy.lastName]);

    // useEffect(() => {
    //     if (edited) {
    //         props.updateMembership({ formBuy }, (response) => {
    //             console.log({ response });
    //             setEdited(false);
    //         });
    //     }
    // });

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
                        <BuyForm
                            date={date}
                            time={time}
                            currentGallon={currentGallon}
                            gallonBuy={gallonBuy}
                            disableBuyInput={disableBuyInput}
                            handleBuyValue={handleBuyValue}
                            buyWaterGallon={buyWaterGallon}
                            gallonAfterBuy={gallonAfterBuy}
                            renewalFee={renewalFee}
                            disableRenewInput={disableRenewInput}
                            handleRenewalFee={handleRenewalFee}
                            handleRenewalAmount={handleRenewalAmount}
                            renewAmount={renewAmount}
                            disableRenewButton={disableRenewButton}
                            renewWaterGallon={renewWaterGallon}
                            disabledBuyButton={disabledBuyButton}
                            edited={edited}
                            changeName={changeName}
                        />
                        {detail.renew !== null &&
                        detail.renew > 0 &&
                        detail.gallonBuy !== detail.renew ? (
                            <RenewReceipt detail={detail} />
                        ) : (
                            <BuyReceipt detail={detail} />
                        )}
                        <Divider hidden />
                        <Button
                            content='Back'
                            floated='right'
                            onClick={handleBackButton}
                        />
                        <Button
                            loading={loading}
                            floated='right'
                            color={!edited ? 'vk' : 'google plus'}
                            content={!edited ? 'Edit Customer' : 'Save'}
                            onClick={() => {
                                if (edited) {
                                    console.log(formBuy);
                                    setLoading(true);
                                    props.updateMembership(
                                        formBuy,
                                        (response) => {
                                            console.log({ response });
                                            setEdited(false);
                                            setLoading(false);
                                        }
                                    );
                                } else {
                                    setEdited(true);
                                }

                                // setEdited((prevState) => !prevState);
                            }}
                        />
                        <Button
                            floated='right'
                            color='twitter'
                            content='Invoices'
                            loading={loading}
                            onClick={handleGetInvoices}
                        />
                        <Debug account={account} />
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
            // firstName,
            firstName: firstName || '',
            phone,
            fullname,
            // fullname: firstName + ' ' + lastName,
            // fullname:
            gallonBuy,
            gallonCurrent,
            gallonRemain,
            invoiceDate,
            invoiceTime,
            lastName: lastName || '',
            lastRenewGallon,
            memberSince,
            prevGallon: parseInt(gallonRemain) || 0,
            record_id: record_id ? parseInt(record_id) + 1 : '',
            renew,
            renewFee,
        },
        membership: state.membership,
        account: state.account.account,
        detail: state.account,
        formBuy: state.form.buy ? state.form.buy.values : {},
    };
};

const ReduxForm = reduxForm({ form: 'buy', enableReinitialize: true })(
    BuyScreen
);
export default connect(mapStateToProps, actions)(ReduxForm);
