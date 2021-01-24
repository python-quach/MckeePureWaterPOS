import React from 'react';
import { Form, Transition, Divider } from 'semantic-ui-react';
import { func, string, bool } from 'prop-types';

const LoginButton = (props) => {
    const {
        transitionProps,
        submitSucceeded,
        errorButton,
        errorMessage,
        loginButton,
        username,
        password,
        focusInput,
    } = props;
    return (
        <>
            <Divider hidden />
            {!errorMessage ? (
                <Form.Button
                    {...loginButton}
                    disabled={!username || !password}
                    onClick={() => focusInput('username')}
                />
            ) : (
                <Transition {...transitionProps} visible={!submitSucceeded}>
                    <Form.Button
                        {...errorButton}
                        onClick={(event) => event.preventDefault()}
                    />
                </Transition>
            )}
        </>
    );
};

LoginButton.propTypes = {
    focusInput: func.isRequired,
    errorMessage: string.isRequired,
    username: string.isRequired,
    password: string.isRequired,
    submitSucceeded: bool.isRequired,
};

LoginButton.defaultProps = {
    loginButton: {
        className: 'LoginButton',
        circular: true,
        fluid: true,
        size: 'huge',
        id: 'LoginButton',
        primary: true,
        icon: 'sign in',
        labelPosition: 'right',
        content: 'Login',
    },
    errorButton: {
        circular: true,
        fluid: true,
        size: 'huge',
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
