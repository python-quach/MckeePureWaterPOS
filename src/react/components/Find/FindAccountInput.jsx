import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

const FindAccountInput = ({
    setting,
    hide,
    clearFields,
    error,
    clearMembership,
}) =>
    !hide ? (
        <Field
            onChange={() => {
                if (error) {
                    clearMembership();
                }
            }}
            onFocus={clearFields}
            {...setting}
            normalize={(value, preValue) => {
                if (value.match(/^\d+$/g) && value.length < 6) {
                    return value;
                } else {
                    if (value.length === 0) {
                        return '';
                    } else {
                        return preValue;
                    }
                }
            }}></Field>
    ) : null;

FindAccountInput.defaultProps = {
    setting: {
        className: 'blueIcon',
        id: 'account',
        component: Form.Input,
        name: 'account',
        placeholder: 'account #',
        focus: true,
        size: 'massive',
        type: 'text',
        fluid: true,
        icon: 'credit card',
        iconPosition: 'left',
        transparent: true,
        inverted: true,
    },
};

export default FindAccountInput;
