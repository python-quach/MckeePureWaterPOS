import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

const FindPhoneInput = ({ setting, hide, clearFields }) =>
    !hide ? (
        <Field
            {...setting}
            onFocus={clearFields}
            normalize={(value, previousValue) => {
                if (value.match(/^\d+$/g) && value.length < 8) {
                    if (value.length === 7)
                        return value.slice(0, 3) + '-' + value.slice(3, 7);
                    if (value.length === 0) return '';

                    return value;
                }

                if (previousValue && previousValue.length > value.length)
                    return value;
                return previousValue;
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
