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
            onFocus={clearFields}></Field>
    ) : null;
};

FindNameInput.defaultProps = {
    setting: {
        className: 'blueIcon',
        // id: 'firstName',
        component: Form.Input,
        // name: 'firstName',
        // placeholder: 'first name',
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
