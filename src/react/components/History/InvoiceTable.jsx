import React from 'react';
import {
    Segment,
    Header,
    Step,
    Icon,
    Button,
    Pagination,
} from 'semantic-ui-react';

import Table from '../Invoice/InvoiceTable';

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
        test,
    } = props;
    return (
        <Segment
            style={{
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
                            <Step.Title>Invoice History</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active>
                        <Icon name='user' />
                        <Step.Content>
                            <Step.Title>{detail.fullname}</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active>
                        <Icon name='address card' />
                        <Step.Content>
                            <Step.Title>Account# {account}</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </Header>
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
                totalPages={Math.ceil(test / 10)}
                ellipsisItem={null}
            />
        </Segment>
    );
};

export default InvoiceTable;
