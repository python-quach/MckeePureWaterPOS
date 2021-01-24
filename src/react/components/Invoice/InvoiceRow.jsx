import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const Row = (props) => {
    // console.log(props);
    const {
        renew,
        gallonBuy,
        gallonRemain,
        renewFee,
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
    };

    const checkRenewFee = () => {
        if (renew !== null) {
            return renewFee;
        } else if (parseInt(gallonBuy) === 0 || gallonBuy === null) {
            return renewFee;
        } else {
            return 0;
        }
    };

    const checkGallonCurrent = () => {
        if (parseInt(gallonBuy) === 0) {
            if (renew === null) {
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
        if (gallonBuy === null) {
            return 'RENEW';
        } else if (parseInt(gallonBuy) === 0) {
            return 'RENEW';
        } else {
            return gallonBuy;
        }
    };

    const RecordID = (props) => {
        const { positive, record_id } = props;
        return positive ? (
            <Label color='green' size='large' ribbon content={record_id} />
        ) : (
            record_id
        );
    };

    return (
        <Table.Row positive={!checkRenewFee() ? false : true}>
            <Table.Cell>
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
            <Table.Cell textAlign='center' content={checkRenew()} />
            <Table.Cell
                textAlign='center'
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
            />
            <Table.Cell content={invoiceDate + '@' + invoiceTime} />
        </Table.Row>
    );
};

export default Row;
