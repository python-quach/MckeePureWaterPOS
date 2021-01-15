import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    TransitionablePortal,
    Segment,
    Grid,
    Header,
    Pagination,
    Step,
    Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getCurrentTime, currentDate } from '../../helpers/helpers';
import BuyForm from './BuyForm';
import BuyReceipt from './BuyReceipt';
import RenewReceipt from './RenewReceipt';
import InvoiceTable from './InvoiceTable';
import * as actions from '../../../actions';

const BuyScreen = (props) => {
    const {
        getAccountInvoices,
        account,
        detail,
        getLastRecord,
        getAccount,
        buy,
        renew,
        resetBuyForm,
        clearAccount,
        clearMembership,
        clearFindForm,
        history,
        changeName,
        formBuy,
        totalInvoice,
        getTotalRenewalGallon,
        getTotalRenewalFee,
        getTotalBuyGallon,
        updateMembership,
    } = props;

    const [open, setOpenPortal] = useState(true);
    const [openHistory, setOpenHistory] = useState(false);
    const { gallonRemain } = detail;

    const handleClose = () => {
        clearAccount();
        clearMembership();
        clearFindForm();
        setOpenPortal(false);
        history.push('/find');
    };

    // Pagination
    const [test, setTest] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const [edited, setEdited] = useState(false);
    const [loadingEdited, setLoadingEdited] = useState(false);
    const [totalRenewalFee, setTotalRenewalFee] = useState(0);
    const [totalRenewalAmount, setTotalRenewalAmount] = useState(0);

    const [date, setCurrentDate] = useState(currentDate());
    const [time, setCurrentTime] = useState(getCurrentTime());
    const [invoices, setInvoices] = useState(null);
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
            console.log(detail);
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
                threeDigit: detail.phone.slice(0, 3),
                fourDigit: detail.phone.slice(4, 8),
            };

            renew(renewData, () => {
                getAccount(account, (currentRecord) => {
                    getAccountInvoices(account, limit, offset, (data) => {
                        setInvoices(data);
                        resetRenewData(currentRecord);
                    });
                });
            });
        });
    };

    const buyWaterGallon = (e) => {
        if (gallonBuy > 0) {
            e.preventDefault();
            getLastRecord((lastRecord) => {
                console.log(detail);
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
                    // renew: 0,
                    renew: null,
                    renewFee: 0,
                    lastRenewGallon: detail.lastRenewGallon,
                    invoiceDate: currentDate(),
                    invoiceTime: getCurrentTime(),
                    areaCode: detail.areaCode,
                    threeDigit: detail.phone.slice(0, 3),
                    fourDigit: detail.phone.slice(4, 8),
                };
                buy(insertData, () => {
                    getAccount(account, (data) => {
                        resetBuyData(data);
                    });
                });
            });
        }
    };

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    const handleBuyValue = (e, { value }) => {
        if (isNaN(parseInt(value))) {
            setGallonBuy(0);
            setGallonAfterBuy(gallonRemain);
        } else {
            setGallonBuy(parseInt(value));
            setGallonAfterBuy(parseInt(gallonRemain) - parseInt(value));
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
            clearAccount();
            clearMembership();
            clearFindForm();
            setOpenPortal(false);
            history.push('/find');
        } else {
            clearAccount();
            clearMembership();
            clearFindForm();
            setOpenPortal(false);
            history.push('/find');
        }
    };

    const [totalBuyGallon, setTotalBuyGallon] = useState(0);

    const handleGetInvoices = () => {
        setLoading(true);
        getAccountInvoices(account, 10, 0, (data) => {
            setLoading(false);
            setActivePage(1);
            setInvoices(data);
            setOpenHistory(true);
            getTotalRenewalFee(account, (data) => {
                setTotalRenewalFee(data);
            });
            getTotalRenewalGallon(account, (data) => {
                setTotalRenewalAmount(data);
            });
            getTotalBuyGallon(account, (data) => {
                setTotalBuyGallon(data);
            });
        });
    };

    useEffect(() => {
        // console.log({ open, offset, limit });
        // if (open)
        getAccountInvoices(account, limit, offset, (data) => {
            setInvoices(data);
        });
    }, [offset, account, limit, getAccountInvoices, open]);

    useEffect(() => {
        if (!test) {
            totalInvoice(account, (count) => {
                setTest(count.count);
            });
        }
    }, [test, account, totalInvoice]);

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
        if (disabledBuyButton && renewAmount === 0) {
            document.getElementById('renew').focus();
        }
        if (!account) {
            history.push('/find');
        }
    });

    useEffect(() => {
        if (edited) {
            document.getElementById('areaCode').focus();
        }
    }, [edited]);

    useEffect(() => {
        changeName(formBuy.firstName + ' ' + formBuy.lastName);
    }, [changeName, formBuy.firstName, formBuy.lastName]);

    return (
        <TransitionablePortal
            open={open}
            onClose={handleClose}
            closeOnTriggerClick
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}
            openOnTriggerClick>
            <Segment
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 1000,
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
                            // color='google plus'
                            content='Done'
                            floated='right'
                            onClick={handleBackButton}
                        />
                        {edited ? (
                            <Button
                                floated='right'
                                content='Cancel Edit'
                                color='blue'
                                // color='primary'
                                onClick={() => {
                                    resetBuyForm();
                                    setEdited(false);
                                }}
                            />
                        ) : null}
                        <Button
                            loading={loadingEdited}
                            floated='right'
                            color={!edited ? 'vk' : 'google plus'}
                            content={!edited ? 'Edit Customer' : 'Save'}
                            onClick={() => {
                                if (edited) {
                                    setLoadingEdited(true);
                                    updateMembership(formBuy, (response) => {
                                        setEdited(false);
                                        setLoadingEdited(false);
                                    });
                                } else {
                                    setEdited(true);
                                }
                            }}
                        />

                        <TransitionablePortal
                            size='large'
                            open={openHistory}
                            closeOnDocumentClick={false}
                            closeOnEscape={false}
                            closeOnDimmerClick={false}
                            closeOnPortalMouseLeave={false}
                            trigger={
                                !openHistory ? (
                                    <Button
                                        floated='right'
                                        content={
                                            openHistory
                                                ? 'Close Invoices'
                                                : 'Show Invoices'
                                        }
                                        negative={openHistory}
                                        positive={!openHistory}
                                        loading={loading}
                                        onClick={() => {
                                            if (!openHistory) {
                                                // setLimit(10);
                                                // setOffset(0);
                                                // setOpenHistory(true);
                                                handleGetInvoices();
                                            } else {
                                                setLimit(10);
                                                setOffset(0);
                                            }
                                        }}
                                    />
                                ) : null
                            }>
                            <Segment
                                style={{
                                    // left: '13%',
                                    left: '10%',
                                    position: 'fixed',
                                    top: '20%',
                                    zIndex: 1001,
                                }}>
                                <Header>
                                    <Step.Group size='mini'>
                                        <Step>
                                            <Icon name='info' />
                                            <Step.Content>
                                                <Step.Title>
                                                    Invoice History
                                                </Step.Title>
                                            </Step.Content>
                                        </Step>
                                        <Step active>
                                            <Icon name='user' />
                                            <Step.Content>
                                                <Step.Title>
                                                    {detail.fullname}
                                                </Step.Title>
                                            </Step.Content>
                                        </Step>
                                        <Step active>
                                            <Icon name='address card' />
                                            <Step.Content>
                                                <Step.Title>
                                                    Account# {account}
                                                </Step.Title>
                                            </Step.Content>
                                        </Step>
                                    </Step.Group>
                                </Header>
                                <InvoiceTable
                                    invoices={invoices}
                                    totalRenewalFee={totalRenewalFee}
                                    totalRenewalAmount={totalRenewalAmount}
                                    totalBuyGallon={totalBuyGallon}
                                    gallonRemain={gallonRemain}
                                />
                                <Button
                                    floated='right'
                                    color='red'
                                    content='Close'
                                    onClick={() => {
                                        // console.log('close');
                                        setOpenHistory(false);
                                        // setActivePage(1);
                                        // setOffset(1 * 10 - 10);
                                        // setActivePage(1);
                                        // setLimit(10);
                                        // setOffset(0);
                                    }}></Button>

                                <Pagination
                                    activePage={activePage}
                                    onPageChange={onChange}
                                    totalPages={Math.ceil(test / 10)}
                                    ellipsisItem={null}
                                />
                            </Segment>
                        </TransitionablePortal>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

const mapStateToProps = (state, ownProps) => {
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
            firstName: firstName || '',
            phone,
            fullname,
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
