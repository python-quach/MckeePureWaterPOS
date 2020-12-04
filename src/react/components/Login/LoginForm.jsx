import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import Field from './LoginField';
import { string } from 'prop-types';

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
        size,
    } = props;
    return (
        <Form onSubmit={handleSubmit} size={size}>
            <Field.Username
                className={iconColor}
                onChange={clearInvalidLoginButton}
            />
            <Field.Password
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

LoginForm.propTypes = {
    size: string.isRequired,
};

LoginForm.defaultProps = {
    size: 'large',
};

export default LoginForm;
