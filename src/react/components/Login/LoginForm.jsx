import React from 'react';
import { Form } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import { LoginField } from './LoginField';

function LoginForm(props) {
    const {
        iconColor,
        clearInvalidLoginButton,
        errorMessage,
        username,
        password,
        focusInput,
        submitSucceeded,
        handleSubmit,
    } = props;
    return (
        <Form onSubmit={handleSubmit((values) => {})} size='large'>
            <LoginField.Username
                className={iconColor}
                onChange={clearInvalidLoginButton}
            />
            <LoginField.Password
                className={iconColor}
                onChange={clearInvalidLoginButton}
            />
            <LoginButton
                errorMessage={errorMessage}
                username={username}
                password={password}
                focusInput={focusInput}
                submitSucceeded={submitSucceeded}
            />
        </Form>
    );
}

export default LoginForm;
