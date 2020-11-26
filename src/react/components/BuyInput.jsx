import React from 'react';
import { Form } from 'semantic-ui-react';

export const Account = ({ input, config }) => (
    <Form.Input {...config} {...input} />
);

export const Record = ({ input, config }) => (
    <Form.Input {...config} {...input} />
);

export const Input = ({ input, config }) => (
    <Form.Input {...config} {...input} />
);

Account.defaultProps = {
    config: {
        className: 'BuyAccount',
        label: 'Account',
        placeholder: '12345',
        inverted: true,
        icon: 'hashtag',
        iconPosition: 'left',
        width: 2,
    },
};

Record.defaultProps = {
    config: {
        className: 'BuyRecord',
        label: 'Record',
        inverted: true,
        icon: 'hashtag',
        iconPosition: 'left',
        placeholder: '12345',
        width: 2,
    },
};

export const BuyInput = {
    Account,
    Record,
};
