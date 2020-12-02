import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import Phone from './FindPhoneInput';
import Account from './FindAccountInput';
import Name from './FindNameInput';

// const Phone = (props) =>
//     !props.hide ? (
//         <Field
//             {...props.setting}
//             normalize={(value, previousValue) => {
//                 console.log({ value, previousValue });
//                 if (value.match(/^\d+$/g) && value.length < 9) {
//                     if (value.length === 7) {
//                         return value.slice(0, 3) + '-' + value.slice(3, 7);
//                     }
//                     return value;
//                 } else {
//                     if (!previousValue || value.length === 0) return '';
//                     if (previousValue.length > value.length) return value;
//                     return previousValue;
//                 }
//             }}
//         />
//     ) : null;

// const Account = (props) => (!props.hide ? <Field {...props.setting} /> : null);

const FirstName = (props) =>
    !props.hide ? <Field {...props.setting} /> : null;

const LastName = (props) => (!props.hide ? <Field {...props.setting} /> : null);

// Phone.propTypes = {
// className: PropTypes.string.isRequired,
// onChange: PropTypes.func.isRequired,
// };

// Phone.defaultProps = {
//     setting: {
//         className: 'blueIcon',
//         id: 'phone',
//         component: Form.Input,
//         name: 'phone',
//         placeholder: 'xxx-xxxx',
//         focus: true,
//         size: 'massive',
//         type: 'text',
//         fluid: true,
//         icon: 'whatsapp',
//         iconPosition: 'left',
//         transparent: true,
//         // inverted: true,
//         onChange: () => {},
//     },
// };

// Account.propTypes = {
// className: PropTypes.string.isRequired,
// onChange: PropTypes.func.isRequired,
// };

// Account.defaultProps = {
//     setting: {
//         className: 'blueIcon',
//         id: 'account',
//         component: Form.Input,
//         name: 'account',
//         placeholder: 'account #',
//         focus: true,
//         size: 'massive',
//         type: 'text',
//         fluid: true,
//         icon: 'credit card',
//         iconPosition: 'left',
//         transparent: true,
//         inverted: true,
//         onChange: () => {},
//     },
// };

FirstName.propTypes = {
    // className: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired,
};

FirstName.defaultProps = {
    setting: {
        className: 'blueIcon',
        id: 'firstName',
        component: Form.Input,
        name: 'firstName',
        placeholder: 'first name',
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

LastName.propTypes = {
    // className: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired,
};

LastName.defaultProps = {
    setting: {
        className: 'blueIcon',
        id: 'lastName',
        component: Form.Input,
        name: 'lastName',
        placeholder: 'last name',
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

const FindField = {
    Phone,
    Account,
    FirstName,
    LastName,
    Name,
};

export default FindField;
