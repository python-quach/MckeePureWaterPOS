import React, { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Grid, Divider } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../shared/constants';
import { LoginField } from '../Login/LoginField';
import LoginButton from '../Login/LoginButton';
import LoginDebug from '../Login/LoginDebug';
const { ipcRenderer } = window;

function LoginForm(props) {
    const {
        handleSubmit,
        submitSucceeded,
        username,
        password,
        clearForm,
        history,
        gridProps,
        login,
        focusInput,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    useEffect(() => {
        if (!username && !password && !submitSucceeded)
            console.log('Login Form:', { username, password, submitSucceeded });

        if (submitSucceeded) {
            login(username, password, (error, data) => {
                if (error) {
                    setErrorMessage(error);
                    clearForm();
                }

                if (data) {
                    history.push('/find');
                    console.log(`Redirect to ${history.location.pathname}`);
                }
            });
        }
    }, [submitSucceeded, username, password, clearForm, history, login]);

    const clearInvalidLoginButton = () => {
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    return (
        <Grid {...gridProps}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={handleSubmit((values) => {})} size='large'>
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
            </Grid.Column>
        </Grid>
    );
}

LoginForm.defaultProps = {
    gridProps: {
        textAlign: 'center',
        style: { height: '100vh' },
        verticalAlign: 'middle',
    },
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('user');
    return {
        username: selectFormData(state, 'username') || '',
        password: selectFormData(state, 'password') || '',
        submitSucceeded: state.form.user ? state.form.user.submitSucceeded : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => dispatch(reset('user')),
        focusInput: (name) => {
            document.getElementById(name).focus();
        },
        login: (username, password, callback) => {
            console.log('LoginForm was submitted', { username, password });
            ipcRenderer.send(channels.APP_INFO, { username, password });

            ipcRenderer.on(
                channels.APP_INFO,
                (event, { error, user_id, username }) => {
                    ipcRenderer.removeAllListeners(channels.APP_INFO);

                    if (error) {
                        console.log('response from server', { error });
                        callback(error, null);
                    } else {
                        console.log('response from server:', {
                            user_id,
                            username,
                        });
                        callback(error, { user_id, username });
                    }
                }
            );
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: 'user' })(LoginForm));
