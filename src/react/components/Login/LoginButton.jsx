import React from 'react';
import { Form, Transition, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LoginButton = (props) => {
    return (
        <Transition.Group>
            <Divider hidden />
            {!props.errorMessage ? (
                <Form.Button
                    {...props.loginButton}
                    disabled={!props.username || !props.password}
                    onClick={() => props.focusInput('username')}
                />
            ) : (
                <Transition
                    {...props.transitionProps}
                    visible={!props.submitSucceeded}>
                    <Form.Button
                        {...props.errorButton}
                        onClick={(event) => event.preventDefault()}
                    />
                </Transition>
            )}
        </Transition.Group>
    );
};

LoginButton.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    focusInput: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
};

LoginButton.defaultProps = {
    loginButton: {
        className: 'LoginButton',
        circular: true,
        fluid: true,
        size: 'massive',
        id: 'LoginButton',
        color: 'teal',
        icon: 'sign in',
        labelPosition: 'right',
        content: 'Login',
    },
    errorButton: {
        circular: true,
        fluid: true,
        size: 'massive',
        id: 'LoginButton',
        color: 'red',
        icon: 'warning sign',
        labelPosition: 'right',
        content: 'Invalid Login',
    },
    transitionProps: {
        animation: 'shake',
        duration: 500,
        unmountOnHide: true,
    },
};

export default LoginButton;
