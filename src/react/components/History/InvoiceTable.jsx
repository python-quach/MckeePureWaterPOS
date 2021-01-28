import React from 'react';
import { Segment, Button, Pagination } from 'semantic-ui-react';
import Table from '../Invoice/InvoiceTable';
import InvoiceHeader from './InvoiceHeader';

const InvoiceTable = (props) => {
    const {
        detail,
        invoices,
        totalRenewalFee,
        totalRenewalAmount,
        totalBuyGallon,
        gallonRemain,
        setOpenHistory,
        activePage,
        onChange,
        totalPages,
        account,
    } = props;

    return (
        <Segment
            style={{
                left: '10%',
                position: 'fixed',
                top: '20%',
                zIndex: 1001,
            }}>
            <InvoiceHeader fullname={detail.fullname} account={account} />
            <Table
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
                    setOpenHistory(false);
                }}></Button>

            <Pagination
                activePage={activePage}
                onPageChange={onChange}
                totalPages={Math.ceil(totalPages / 10)}
                ellipsisItem={null}
            />
        </Segment>
    );
};

export default InvoiceTable;
