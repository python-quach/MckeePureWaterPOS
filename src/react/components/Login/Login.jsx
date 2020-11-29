import React, { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import { Grid } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../../shared/constants';
import LoginDebug from './LoginDebug';
import LoginForm from './LoginForm';
const { ipcRenderer } = window;

function LoginContainer(props) {
    const {
        submitSucceeded,
        username,
        password,
        clearForm,
        history,
        gridProps,
        login,
        focusInput,
        handleSubmit,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    useEffect(() => {
        if (!username && !password && !submitSucceeded)
            console.log('Login Form:', { username, password, submitSucceeded });
    }, [submitSucceeded, username, password, clearForm, history, login]);

    useEffect(() => {
        const showInvalidButton = (error) => {
            setErrorMessage(error);
            clearForm();
        };

        const redirectUserToFindPage = (data) => {
            history.push('/find');
            console.log(`redirected to  ${history.location.pathname}`, data);
        };

        if (submitSucceeded) {
            login(username, password, (error, data) => {
                error ? showInvalidButton(error) : redirectUserToFindPage(data);
            });
        }
    }, [login, submitSucceeded, password, username, clearForm, history]);

    const clearInvalidLoginButton = () => {
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    return (
        <Grid {...gridProps}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <LoginForm
                    size='large'
                    handleSubmit={handleSubmit((value) => {})}
                    iconColor={iconColor}
                    clearInvalidLoginButton={clearInvalidLoginButton}
                    errorMessage={errorMessage}
                    username={username}
                    password={password}
                    focusInput={focusInput}
                    submitSucceeded={submitSucceeded}
                />
                <LoginDebug
                    username={username}
                    password={password}
                    errorMessage={errorMessage}
                    submitSucceeded={submitSucceeded}
                />
            </Grid.Column>
        </Grid>
    );
}

LoginContainer.defaultProps = {
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

const ReduxLoginForm = reduxForm({ form: 'user' })(LoginContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxLoginForm);
