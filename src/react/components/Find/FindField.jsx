import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const Phone = (props) => <Field {...props} />;
const Account = (props) => <Field {...props} />;
const FirstName = (props) => <Field {...props} />;
const LastName = (props) => <Field {...props} />;

Phone.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Phone.defaultProps = {
    id: 'phone',
    component: Form.Input,
    name: 'phone',
    placeholder: 'phone',
    focus: true,
    size: 'massive',
    type: 'text',
    fluid: true,
    icon: 'user circle',
    iconPosition: 'left',
    transparent: true,
    inverted: true,
    className: 'default',
    onChange: () => {},
};

Account.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Account.defaultProps = {
    id: 'account',
    component: Form.Input,
    name: 'account',
    placeholder: 'account',
    focus: true,
    size: 'massive',
    type: 'text',
    fluid: true,
    icon: 'lock',
    iconPosition: 'left',
    transparent: true,
    inverted: true,
    onChange: () => {},
};

FirstName.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

FirstName.defaultProps = {
    id: 'firstName',
    component: Form.Input,
    name: 'firstName',
    placeholder: 'First Name',
    focus: true,
    size: 'massive',
    type: 'text',
    fluid: true,
    icon: 'lock',
    iconPosition: 'left',
    transparent: true,
    inverted: true,
    onChange: () => {},
};

LastName.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

LastName.defaultProps = {
    id: 'lastName',
    component: Form.Input,
    name: 'lastName',
    placeholder: 'Last Name',
    focus: true,
    size: 'massive',
    type: 'text',
    fluid: true,
    icon: 'lock',
    iconPosition: 'left',
    transparent: true,
    inverted: true,
    onChange: () => {},
};

const FindField = {
    Phone,
    Account,
    FirstName,
    LastName,
};

export default FindField;
