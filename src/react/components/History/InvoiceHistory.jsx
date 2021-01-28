import React from 'react';
import { TransitionablePortal } from 'semantic-ui-react';
import InvoiceButton from './InvoiceButton';

const InvoiceHistory = (props) => {
    const { openHistory, children } = props;
    return (
        <TransitionablePortal
            size='large'
            open={openHistory}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}
            trigger={<InvoiceButton {...props} />}>
            {children}
        </TransitionablePortal>
    );
};

export default InvoiceHistory;
