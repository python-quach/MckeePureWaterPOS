import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Grid, Divider, Transition, Message } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

function LoginForm(props) {
    const {
        handleSubmit,
        submitSucceeded,
        username,
        password,
        clearForm,
        history,
        usernameProps,
        passwordProps,
        loginButton,
        errorButton,
        transitionProps,
        gridProps,
        login,
    } = props;

    const [errorMessage, setErrorMessage] = useState(false);
    const [userIconColor, setUserIconColor] = useState('TealIconUserName');
    const [lockIconColor, setLockIconColor] = useState('TealIconPassword');

    useEffect(() => {
        if (!username && !password && !submitSucceeded)
            console.log('Login Form:', { username, password, submitSucceeded });
    }, [submitSucceeded, username, password]);

    useEffect(() => {
        if (errorMessage) {
            setUserIconColor('RedIconUserName');
            setLockIconColor('RedIconPassword');
        } else {
            setUserIconColor('TealIconUserName');
            setLockIconColor('TealIconPassword');
        }
    }, [username, password, submitSucceeded, errorMessage]);

    useEffect(() => {
        login(submitSucceeded, username, password, (error, data) => {
            if (error) {
                setErrorMessage(error);
                clearForm();
            }

            if (data) {
                history.push('/find');
            }
        });
    }, [login, submitSucceeded, password, username, clearForm, history]);

    const clearInvalidLoginButton = () => {
        if (errorMessage) {
            setErrorMessage(false);
            // clearForm();
        }
    };

    return (
        <Grid {...gridProps}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={handleSubmit((values) => {})} size='large'>
                    <Field
                        {...usernameProps}
                        className={userIconColor}
                        onChange={clearInvalidLoginButton}
                        // onFocus={() => console.log('username')}
                    />
                    <Field
                        {...passwordProps}
                        className={lockIconColor}
                        onChange={clearInvalidLoginButton}
                        // onFocus={() => console.log('password')}
                    />
                    <Divider hidden />
                    <Transition.Group>
                        {!errorMessage ? (
                            <Form.Button
                                {...loginButton}
                                disabled={!username || !password}
                                onClick={() => {
                                    document.getElementById('username').focus();
                                }}
                                // onFocus={() => {
                                //     console.log('login button');
                                // }}
                            />
                        ) : (
                            <Transition
                                {...transitionProps}
                                visible={!submitSucceeded}>
                                <Form.Button
                                    {...errorButton}
                                    onClick={(event, data) => {
                                        event.preventDefault();
                                    }}
                                />
                            </Transition>
                        )}
                    </Transition.Group>
                </Form>

                <Form.Group>
                    <Divider hidden />
                    <Message>
                        <Message.Header>Form data:</Message.Header>
                        <pre>
                            {JSON.stringify(
                                {
                                    username,
                                    password,
                                    submitSucceeded,
                                    errorMessage,
                                },
                                null,
                                2
                            )}
                        </pre>
                    </Message>
                </Form.Group>
            </Grid.Column>
        </Grid>
    );
}

LoginForm.defaultProps = {
    usernameProps: {
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
    },
    passwordProps: {
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
    },
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
    gridProps: {
        textAlign: 'center',
        style: { height: '100vh' },
        verticalAlign: 'middle',
    },
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('user');
    return {
        username: selectFormData(state, 'username'),
        password: selectFormData(state, 'password'),
        submitSucceeded: state.form.user ? state.form.user.submitSucceeded : {},
        // userForm: state.form.user
        //     ? {
        //           values: state.form.user.values,
        //           submitSucceeded: state.form.user.submitSucceeded,
        //       }
        //     : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => dispatch(reset('user')),
        login: (submitSucceeded, username, password, callback) => {
            if (submitSucceeded) {
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
                            const data = {
                                user_id,
                                username,
                            };
                            callback(error, data);
                            console.log('response from server:', {
                                user_id,
                                username,
                            });
                        }
                    }
                );
            }
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: 'user' })(LoginForm));
