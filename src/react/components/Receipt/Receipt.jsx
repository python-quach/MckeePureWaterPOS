import React from 'react';
import BuyReceipt from './BuyReceipt';
import RenewReceipt from './RenewReceipt';

const Receipt = (props) => {
    const { renew, gallonBuy, detail } = props;
    return renew !== null && renew > 0 && gallonBuy !== renew ? (
        <RenewReceipt detail={detail} />
    ) : (
        <BuyReceipt detail={detail} />
    );
};

export default Receipt;
