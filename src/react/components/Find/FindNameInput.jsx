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
    error,
    clearMembership,
}) => {
    return !hide ? (
        <Field
            onChange={() => {
                if (error) {
                    clearMembership();
                }
            }}
            id={id}
            name={name}
            placeholder={placeholder}
            {...setting}
            onFocus={clearFields}
            normalize={(
                value,
                previousValue,
                allValues,
                previousAllValues,
                name
            ) => {
                const wordPattern = /^[a-zA-Z ]+$/;

                if (value.match(wordPattern) && value.length > 0) {
                    return (
                        // value.charAt(0).toUpperCase() +
                        // value.slice(1).replace(/\s/g, '').toLowerCase()
                        value.toUpperCase()
                    );
                } else {
                    if (value.length > 1) {
                        return previousValue.toUpperCase();
                        // return previousValue;
                    } else {
                        return '';
                    }
                }
            }}
        />
    ) : null;
};

FindNameInput.defaultProps = {
    setting: {
        className: 'blueIcon',
        component: Form.Input,
        // placeholder: 'first name',
        focus: true,
        size: 'massive',
        type: 'text',
        fluid: true,
        icon: 'user circle',
        iconPosition: 'left',
        transparent: true,
        inverted: true,
        // onChange: () => {},
    },
};

export default FindNameInput;

// function name(value, previousValue, allValues, previousAllValues, name) {
//     const wordPattern = /^[a-zA-Z ]+$/;

//     if (value.match(wordPattern) && value.length > 0) {
//         return (
//             value.charAt(0).toUpperCase() +
//             value.slice(1).replace(/\s/g, '').toLowerCase()
//         );
//     } else {
//         if (value.length > 1) {
//             return previousValue;
//         } else {
//             return '';
//         }
//     }
// }
