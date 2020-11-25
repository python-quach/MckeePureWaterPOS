import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Grid, Message, Divider, Icon } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

const LoginForm = (props) => {
    const {
        handleSubmit,
        userForm: { submitSucceeded },
        username,
        password,
        clearForm,
        history,
    } = props;
    const [errorMessage, setErrorMessage] = useState('');

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

    // useEffect(() => {
    //     if (users.length !== 0) {
    //         console.log({ users });
    //     }
    // }, [users]);

    const loginUser = (values) => {
        console.log('LoginForm was submitted', { values });
        // clearForm();
    };

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={handleSubmit(loginUser)} size='large'>
                    <Field
                        component={Form.Input}
                        name='username'
                        placeholder='username'
                        focus
                        size='massive'
                        type='text'
                        fluid
                        icon='user'
                        iconPosition='left'
                        transparent
                        inverted
                        onFocus={() => {
                            if (errorMessage) {
                                setErrorMessage('');
                            }
                        }}
                    />
                    <Field
                        component={Form.Input}
                        name='password'
                        placeholder='password'
                        focus
                        size='massive'
                        type='password'
                        fluid
                        icon='lock'
                        iconPosition='left'
                        transparent
                        inverted
                        onFocus={() => setErrorMessage('')}
                    />
                    <Form.Button
                        // disabled={!username || !password}
                        fluid
                        size='massive'
                        id='LoginButton'
                        color='teal'
                        content='Login'
                        onClick={(event, data) => {
                            document.getElementById('LoginButton').focus();
                        }}
                    />
                </Form>
                {errorMessage ? (
                    <Message icon color='pink'>
                        <Icon name='circle notched' loading />
                        <Message.Header>{errorMessage}</Message.Header>
                    </Message>
                ) : null}
                {/* <Form.Group>
                    <Divider hidden />
                    <Message>
                        <Message.Header>Form data:</Message.Header>
                        <pre>
                            {JSON.stringify(
                                { username, password, submitSucceeded },
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

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('user');
    return {
        username: selectFormData(state, 'username'),
        password: selectFormData(state, 'password'),
        userForm: state.form.user
            ? {
                  values: state.form.user.values,
                  submitSucceeded: state.form.user.submitSucceeded,
              }
            : {},
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
