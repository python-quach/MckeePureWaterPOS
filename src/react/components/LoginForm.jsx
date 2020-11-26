import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Grid, Divider, Transition, Message } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

const LoginForm = (props) => {
    const {
        handleSubmit,
        submitSucceeded,
        username,
        password,
        clearForm,
        history,
        usernameProps,
        passwordProps,
    } = props;

    const [errorMessage, setErrorMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setVisible((prevState) => !prevState);
        }
    }, [errorMessage, setErrorMessage]);

    useEffect(() => {
        if (submitSucceeded) {
            console.log(username, password);
            ipcRenderer.send(channels.APP_INFO, { username, password });
            ipcRenderer.on(channels.APP_INFO, (event, response) => {
                ipcRenderer.removeAllListeners(channels.APP_INFO);

                const { auth } = response;
                if (!auth) {
                    console.log({ response });
                    clearForm();
                    setErrorMessage(response.error);
                } else {
                    console.log({ response });
                    clearForm();
                    history.push('/find');
                }
            });
        }
    }, [submitSucceeded, password, username, clearForm, history]);

    const loginUser = (values) => {
        console.log('LoginForm was submitted', { values });
    };

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={handleSubmit(loginUser)} size='large'>
                    <Field
                        className={
                            visible ? 'RedIconUserName' : 'TealIconUserName'
                        }
                        {...usernameProps}
                        // onMouseOver={() => {
                        //     if (visible) {
                        //         setErrorMessage(false);
                        //         setVisible(false);
                        //     }
                        //     setErrorMessage(false);
                        // }}
                        onFocus={() => {
                            if (visible) {
                                setErrorMessage(false);
                                setVisible(false);
                            }
                            setErrorMessage(false);
                        }}
                    />
                    <Field
                        className={
                            visible ? 'RedIconPassword' : 'TealIconPassword'
                        }
                        {...passwordProps}
                        onFocus={() => {
                            if (visible) {
                                setErrorMessage(false);
                                setVisible(false);
                            }
                            setErrorMessage(false);
                        }}
                    />
                    <Divider hidden />
                    <Transition.Group>
                        {!errorMessage ? (
                            <Form.Button
                                className='LoginButton'
                                // basic
                                circular
                                // disabled={!username || !password}
                                fluid
                                size='massive'
                                id='LoginButton'
                                color='teal'
                                icon='sign in'
                                labelPosition='right'
                                content='Login'
                                onClick={(event, data) => {
                                    document
                                        .getElementById('LoginButton')
                                        .focus();
                                }}
                            />
                        ) : (
                            <Transition
                                visible={visible}
                                animation='shake'
                                duration={500}
                                unmountOnHide={true}>
                                <Form.Button
                                    circular
                                    fluid
                                    size='massive'
                                    id='LoginButton'
                                    color='red'
                                    icon='warning sign'
                                    labelPosition='right'
                                    content='Invalid Login'
                                    onClick={(event, data) => {
                                        event.preventDefault();
                                    }}
                                />
                            </Transition>
                        )}
                    </Transition.Group>
                </Form>

                {/* <Form.Group>
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
                                    visible,
                                },
                                null,
                                2
                            )}
                        </pre>
                    </Message>
                </Form.Group> */}
            </Grid.Column>
        </Grid>
    );
};

LoginForm.defaultProps = {
    usernameProps: {
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
        component: Form.Input,
        name: 'password',
        placeholder: 'password',
        focus: true,
        size: 'massive',
        type: 'password',
        fluid: true,
        icon: 'lock ',
        iconPosition: 'left',
        transparent: true,
        inverted: true,
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: 'user' })(LoginForm));
