import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    TransitionablePortal,
    Segment,
    Grid,
    Header,
    Pagination,
    Table,
    Label,
    Statistic,
    Icon,
    Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getCurrentTime, currentDate } from '../../helpers/helpers';
import BuyForm from './BuyForm';
import BuyReceipt from './BuyReceipt';
import RenewReceipt from './RenewReceipt';
import * as actions from '../../../actions';

const Row = (props) => {
    const checkRenew = () => {
        if (props.renew === null || props.gallonBuy === null) {
            return props.gallonRemain;
        } else if (props.renew === props.gallonBuy) {
            return 0;
        } else {
            return props.renew;
        }
    };

    const checkRenewFee = () => {
        if (props.renew === null) {
            return props.renewFee;
        } else if (
            parseInt(props.gallonBuy) === 0 ||
            props.gallonBuy === null
        ) {
            return props.renewFee;
        } else {
            return 0;
        }
    };

    const checkGallonCurrent = () => {
        if (parseInt(props.gallonBuy) === 0) {
            // if (parseInt(props.gallonBuy) === 0 || props.gallonBuy === nul) {
            return parseInt(props.gallonRemain) - parseInt(props.renew);
        } else if (props.renew === null) {
            return parseInt(props.overGallon);
        } else if (props.gallonBuy === null) {
            return parseInt(props.overGallon) - parseInt(props.gallonRemain);
        } else {
            return props.gallonCurrent;
        }
    };

    const checkGallonBuy = () => {
        if (parseInt(props.gallonBuy) === 0 || props.gallonBuy === null) {
            return 'RENEW';
        } else if (props.renew === null) {
            return 'RENEW';
        } else {
            return props.gallonBuy;
        }
    };

    return (
        <Table.Row
            // negative={props.gallonRemain <= 0}
            positive={
                props.renew === null ||
                parseInt(props.gallonBuy) === 0 ||
                props.gallonBuy === null
            }>
            <Table.Cell>
                {props.renew === null ||
                parseInt(props.gallonBuy) === 0 ||
                props.gallonBuy === null ? (
                    <Label color='green' size='large' ribbon>
                        {props.record_id}
                    </Label>
                ) : (
                    props.record_id
                )}
            </Table.Cell>
            <Table.Cell>{props.account}</Table.Cell>
            <Table.Cell>{props.memberSince}</Table.Cell>
            <Table.Cell>{'(' + props.areaCode + ') ' + props.phone}</Table.Cell>
            <Table.Cell>{props.fullname}</Table.Cell>
            <Table.Cell textAlign='center'>{checkRenewFee()}</Table.Cell>
            <Table.Cell textAlign='center'>{checkRenew()}</Table.Cell>
            <Table.Cell
                textAlign='center'
                negative={
                    props.gallonCurrent - props.renew < 0 ? true : false
                    // props.renew < props.gallonRemain ? true : false
                }>
                {checkGallonCurrent()}
            </Table.Cell>
            <Table.Cell textAlign='center'>{checkGallonBuy()}</Table.Cell>
            <Table.Cell
                textAlign='center'
                negative={props.gallonRemain <= 0 ? true : false}>
                {props.gallonRemain}
            </Table.Cell>
            <Table.Cell>
                {props.invoiceDate + '@' + props.invoiceTime}
            </Table.Cell>
            {/* <Table.Cell>
                <Button
                    color='red'
                    content='Void'
                    onClick={() => {
                        console.log('Delete invoice', props.record_id);
                    }}
                />
            </Table.Cell> */}
        </Table.Row>
    );
};

const InvoiceTable = (props) => {
    const { invoices, totalRenewalFee, totalRenewalAmount } = props;
    return invoices ? (
        <Table celled color='blue' size='small'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content='Invoice' />
                    <Table.HeaderCell content='Membership' />
                    <Table.HeaderCell content='Member Since' />
                    <Table.HeaderCell content='Phone Number' />
                    <Table.HeaderCell content='Name' />
                    <Table.HeaderCell content='Renew Fee' />
                    <Table.HeaderCell content='Gallon Renew' />
                    <Table.HeaderCell content='Gallon Prev' />
                    <Table.HeaderCell content='Gallon Buy' />
                    <Table.HeaderCell content='Gallon Remain' />
                    <Table.HeaderCell content='Purchase Date' />
                    {/* <Table.HeaderCell content='Action' /> */}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice, index) => {
                    return <Row {...invoice} key={index} />;
                })}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'></Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='blue' size='mini'>
                            <Statistic.Value>TOTAL</Statistic.Value>
                            {/* <Statistic.Label>Fee Total</Statistic.Label> */}
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>
                                ${totalRenewalFee}
                            </Statistic.Value>
                            {/* <Statistic.Label>Fee Total</Statistic.Label> */}
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>
                                {totalRenewalAmount}
                            </Statistic.Value>
                            {/* <Statistic.Label>Renew Total</Statistic.Label> */}
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell content=''></Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>14</Statistic.Value>
                            {/* <Statistic.Label>Renew Total</Statistic.Label> */}
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>14</Statistic.Value>
                            {/* <Statistic.Label>Renew Total</Statistic.Label> */}
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='1'></Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    ) : null;
};

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
        totalInvoice,
        getTotalRenewalGallon,
    } = props;

    const { gallonRemain } = detail;

    const handleClose = () => {
        clearAccount();
        clearMembership();
        clearFindForm();
        setOpenPortal(false);
        history.push('/find');
    };
    const [openHistory, setOpenHistory] = useState(false);

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

    const handleGetInvoices = () => {
        console.log(account);
        setLoading(true);

        // Get Total Number of account first
        getAccountInvoices(account, limit, offset, (data) => {
            console.log(data);
            setLoading(false);
            setInvoices(data);
            setOpenHistory(true);
            props.getTotalRenewalFee(account, (data) => {
                setTotalRenewalFee(data);
            });
            props.getTotalRenewalGallon(account, (data) => {
                setTotalRenewalAmount(data);
            });
        });
    };

    useEffect(() => {
        console.log('BuyForm Debug', { props });
    });

    useEffect(() => {
        if (open)
            getAccountInvoices(account, limit, offset, (data) => {
                setInvoices(data);
                // setLoading(false);
            });
    }, [offset, account, limit, getAccountInvoices, open]);

    useEffect(() => {
        if (!test) {
            totalInvoice(account, (count) => {
                console.log({ count });
                setTest(count.count);
            });
        }
    }, [test, account, totalInvoice]);

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
        if (invoices) {
            console.log('invoice', invoices.length);
        }
    }, [invoices]);

    useEffect(() => {
        console.log({ edited });
        if (edited) {
            document.getElementById('areaCode').focus();
        }
    }, [edited]);

    useEffect(() => {
        changeName(formBuy.firstName + ' ' + formBuy.lastName);
    }, [changeName, formBuy.firstName, formBuy.lastName]);

    // Get invoice Total
    // useEffect(() => {
    //     if (account) {
    //         getTotalRenewalGallon(account, (data) => {
    //             setTotalRenewalAmount(data);
    //         });
    //     }
    // }, [setTotalRenewalAmount, getTotalRenewalGallon, account]);

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
                            content='Back'
                            floated='right'
                            onClick={handleBackButton}
                        />
                        {edited ? (
                            <Button
                                floated='right'
                                content='Cancel Edit'
                                color='primary'
                                onClick={() => {
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
                                    console.log(formBuy);
                                    setLoadingEdited(true);
                                    props.updateMembership(
                                        formBuy,
                                        (response) => {
                                            console.log({ response });
                                            setEdited(false);
                                            setLoadingEdited(false);
                                        }
                                    );
                                } else {
                                    setEdited(true);
                                }
                            }}
                        />

                        <TransitionablePortal
                            size='large'
                            open={openHistory}
                            // closeOnTriggerClick
                            closeOnDocumentClick={false}
                            closeOnEscape={false}
                            closeOnDimmerClick={false}
                            closeOnPortalMouseLeave={false}
                            // openOnTriggerClick
                            // onOpen={() => {
                            //     console.log('onOpen');
                            //     setOpenHistory(true);
                            // }}
                            // onClose={() => {
                            //     console.log('onClose');
                            //     setOpenHistory(false);
                            // }}
                            // onHide={() => {
                            //     // setOpenPortal(true);
                            // }}
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
                                    left: '13%',
                                    position: 'fixed',
                                    top: '20%',
                                    zIndex: 1001,
                                }}>
                                <Header>This is an example portal</Header>
                                <InvoiceTable
                                    invoices={invoices}
                                    totalRenewalFee={totalRenewalFee}
                                    totalRenewalAmount={totalRenewalAmount}
                                />
                                <Button
                                    floated='right'
                                    color='red'
                                    content='Close'
                                    onClick={() => {
                                        console.log('close');
                                        // setLimit(10);
                                        // setOffset(0);
                                        setOpenHistory(false);
                                        setActivePage(1);
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
