import React from 'react';
import { Form, Button } from 'semantic-ui-react';
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
        closeApp,
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
            <Button
                className='LoginButton'
                circular
                fluid={true}
                size='massive'
                color='black'
                icon='close'
                labelPosition='right'
                content='Close'
                onClick={(e) => {
                    e.preventDefault();
                    console.log('close');
                    closeApp();
                }}></Button>
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
