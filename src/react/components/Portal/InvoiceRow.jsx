import React, { useState, useEffect } from 'react';
import { Table, Label } from 'semantic-ui-react';

const Row = (props) => {
    console.log(props);
    const {
        renew,
        gallonBuy,
        gallonRemain,
        renewFee,
        overGallon,
        gallonCurrent,
        record_id,
        account,
        memberSince,
        areaCode,
        phone,
        fullname,
        invoiceDate,
        invoiceTime,
    } = props;

    const checkRenew = () => {
        if (gallonBuy === null) {
            return renew;
        } else if (parseInt(gallonBuy) === 0) {
            if (renew === null) {
                return gallonCurrent;
            }
            return renew;
        } else {
            return 0;
        }
        // if (renew === null || gallonBuy === null) {
        //     return gallonRemain;
        // } else if (renew === gallonBuy) {
        //     return 0;
        // } else {
        //     return renew;
        // }
    };

    const checkRenewFee = () => {
        // if (renew === null) {
        if (renew !== null) {
            return renewFee;
        } else if (parseInt(gallonBuy) === 0 || gallonBuy === null) {
            return renewFee;
        } else {
            return 0;
        }
    };

    const checkGallonCurrent = () => {
        // if (parseInt(gallonBuy) === 0) {
        //     if (renew === null) {
        //         // return gallonCurrent;
        //         return 0;
        //     }
        //     return parseInt(gallonRemain) - parseInt(renew);
        // } else if (renew === null) {
        //     return parseInt(overGallon);
        // } else if (gallonBuy === null) {
        //     return parseInt(overGallon) - parseInt(gallonRemain);
        // } else {
        //     return gallonCurrent;
        // }
        // console.log(overGallon);

        // if (overGallon < 0) {
        //     console.log(overGallon);
        //     return overGallon;
        // } else {
        //     return gallonCurrent;
        // }

        // if (gallonBuy === null || renew === null) {
        //     return 0;
        // }

        if (parseInt(gallonBuy) === 0) {
            if (renew === null) {
                // return gallonCurrent;
                return 0;
            }
            return parseInt(gallonRemain) - parseInt(renew);
        }
        if (gallonBuy === null) {
            return parseInt(gallonRemain) - parseInt(renew);
        }

        return gallonCurrent;
    };

    const checkGallonBuy = () => {
        // if (parseInt(gallonBuy) === 0 || gallonBuy === null) {
        //     return 'RENEW';
        // } else if (renew === null) {
        //     return 'RENEW';
        // } else {
        //     return gallonBuy;
        // }

        if (gallonBuy === null) {
            return 'RENEW';
        } else if (parseInt(gallonBuy) === 0) {
            return 'RENEW';
        } else {
            return gallonBuy;
        }
    };

    const [positive, setPositive] = useState(
        renew === null || parseInt(gallonBuy) === 0 || gallonBuy === null
    );

    const RecordID = (props) => {
        const { positive, record_id } = props;
        return positive ? (
            <Label color='green' size='large' ribbon content={record_id} />
        ) : (
            record_id
        );
    };

    useEffect(() => {
        setPositive(
            renew === null || parseInt(gallonBuy) === 0 || gallonBuy === null
        );
    }, [renew, gallonBuy]);

    return (
        <Table.Row positive={!checkRenewFee() ? false : true}>
            {/* <Table.Row> */}
            <Table.Cell>
                {/* <RecordID positive={positive} record_id={record_id} /> */}
                <RecordID
                    positive={!checkRenewFee() ? false : true}
                    record_id={record_id}
                />
            </Table.Cell>
            <Table.Cell content={account} />
            <Table.Cell content={memberSince} />
            <Table.Cell content={'(' + areaCode + ') ' + phone} />
            <Table.Cell content={fullname} />
            <Table.Cell textAlign='center' content={checkRenewFee()} />
            {/* <Table.Cell textAlign='center' content={renewFee} /> */}
            <Table.Cell textAlign='center' content={checkRenew()} />
            {/* <Table.Cell textAlign='center' content={renew} /> */}
            <Table.Cell
                textAlign='center'
                // negative={gallonCurrent - renew < 0 ? true : false}
                negative={
                    parseInt(gallonRemain) - parseInt(renew) < 0 ? true : false
                }
                content={checkGallonCurrent()}
            />
            <Table.Cell textAlign='center' content={checkGallonBuy()} />
            <Table.Cell
                textAlign='center'
                negative={gallonRemain <= 0 ? true : false}
                content={gallonRemain}
                // content={gallonCurrent - gallonBuy}
            />
            <Table.Cell content={invoiceDate + '@' + invoiceTime} />
        </Table.Row>
    );
};

export default Row;
