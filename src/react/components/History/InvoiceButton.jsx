import React from 'react';
import { Button } from 'semantic-ui-react';

const ShowInvoiceButton = (props) => {
    const {
        openHistory,
        loading,
        handleGetInvoices,
        setLimit,
        setOffset,
    } = props;

    const showInvoiceHistory = () => {
        if (!openHistory) {
            handleGetInvoices();
        } else {
            setLimit(10);
            setOffset(0);
        }
    };

    return !openHistory ? (
        <Button
            floated='right'
            content={openHistory ? 'Close Invoices' : 'Show Invoices'}
            negative={openHistory}
            positive={!openHistory}
            loading={loading}
            onClick={showInvoiceHistory}
        />
    ) : null;
};

export default ShowInvoiceButton;
