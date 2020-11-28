import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const Username = (props) => <Field {...props} />;
const Password = (props) => <Field {...props} />;

Username.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Username.defaultProps = {
    id: 'username',
    component: Form.Input,
    name: 'username',
    placeholder: 'username',
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

Password.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Password.defaultProps = {
    id: 'password',
    component: Form.Input,
    name: 'password',
    placeholder: 'password',
    focus: true,
    size: 'massive',
    type: 'password',
    fluid: true,
    icon: 'lock',
    iconPosition: 'left',
    transparent: true,
    inverted: true,
    onChange: () => {},
};

export const LoginField = {
    Username,
    Password,
};
