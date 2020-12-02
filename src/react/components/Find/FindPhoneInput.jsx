import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

const FindPhoneInput = ({ setting, hide, clearFields }) =>
    !hide ? (
        <Field
            {...setting}
            onFocus={() => {
                clearFields(true, false, 'account', 'firstName', 'lastName');
            }}
            normalize={(value, previousValue) => {
                console.log({ value, previousValue });
                if (value.match(/^\d+$/g) && value.length < 9) {
                    if (value.length === 7) {
                        return value.slice(0, 3) + '-' + value.slice(3, 7);
                    }
                    return value;
                } else {
                    if (!previousValue || value.length === 0) return '';
                    if (previousValue.length > value.length) return value;
                    return previousValue;
                }
            }}
        />
    ) : null;

FindPhoneInput.defaultProps = {
    setting: {
        className: 'blueIcon',
        id: 'phone',
        component: Form.Input,
        name: 'phone',
        placeholder: 'xxx-xxxx',
        focus: true,
        size: 'massive',
        type: 'text',
        fluid: true,
        icon: 'whatsapp',
        iconPosition: 'left',
        transparent: true,
        onChange: () => {},
    },
};
export default FindPhoneInput;
