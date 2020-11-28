import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import LoginDebug from './LoginDebug';
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
        <>
            {/* <Form onSubmit={handleSubmit((values) => {})} size='large'> */}
            <Form onSubmit={handleSubmit} size='large'>
                <LoginField.Username
                    className={iconColor}
                    onChange={clearInvalidLoginButton}
                />
                <LoginField.Password
                    className={iconColor}
                    onChange={clearInvalidLoginButton}
                />
                <Divider hidden />
                <LoginButton
                    errorMessage={errorMessage}
                    username={username}
                    password={password}
                    focusInput={focusInput}
                    submitSucceeded={submitSucceeded}
                />
            </Form>
            <LoginDebug
                username={username}
                password={password}
                submitSucceeded={submitSucceeded}
                errorMessage={errorMessage}
            />
        </>
    );
}

export default LoginForm;
