import React, { useState } from 'react';
// import { Form, Button, Divider } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import Field from './LoginField';
import { string } from 'prop-types';
// import { dialog } from 'electron';
// const { dialog } = require('electron').remote;

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
        backup,
    } = props;
    const [save, setSave] = useState(false);
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

            <Form.Group>
                <Button
                    className='LoginButton'
                    circular
                    fluid={true}
                    size='huge'
                    color='black'
                    icon='close'
                    labelPosition='right'
                    content='Close'
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('close');
                        closeApp();
                    }}
                />
                <Button
                    className='LoginButton'
                    circular
                    fluid={true}
                    size='huge'
                    color='pink'
                    icon='save'
                    labelPosition='right'
                    content='Backup'
                    loading={save}
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Backup');
                        setSave(true);
                        backup((response) => {
                            console.log(response);
                            setSave(false);
                        });
                    }}
                />
            </Form.Group>
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
