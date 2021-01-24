import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
// import Phone from '../Grid/FindPhoneInput';
import Phone from './FindPhoneInput';
import Account from './FindAccountInput';
import Name from './FindNameInput';

const FirstName = (props) =>
    !props.hide ? <Field {...props.setting} /> : null;

const LastName = (props) => (!props.hide ? <Field {...props.setting} /> : null);

FirstName.propTypes = {};

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

LastName.propTypes = {};

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
