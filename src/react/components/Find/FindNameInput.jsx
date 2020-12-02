import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'semantic-ui-react';

const FindNameInput = ({
    hide,
    setting,
    clearFields,
    id,
    name,
    placeholder,
}) => {
    return !hide ? (
        <Field
            id={id}
            name={name}
            placeholder={placeholder}
            {...setting}
            onFocus={clearFields}
        />
    ) : null;
};

FindNameInput.defaultProps = {
    setting: {
        className: 'blueIcon',
        component: Form.Input,
        focus: true,
        size: 'massive',
        type: 'text',
        fluid: true,
        icon: 'user circle',
        iconPosition: 'left',
        transparent: true,
        inverted: true,
        onChange: () => {},
    },
};

export default FindNameInput;
