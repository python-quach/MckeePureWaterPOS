import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Grid, Message, Divider } from 'semantic-ui-react';

const LoginForm = (props) => {
    const { handleSubmit, data, username, password } = props;

    useEffect(() => {
        console.log('LoginForm', { username, password });
    }, [username, password]);

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={handleSubmit} size='large'>
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
                    />
                    <Form.Button
                        disabled={!username || !password}
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
                <Form.Group>
                    <Divider hidden />
                    <Message>
                        <Message.Header>Form data:</Message.Header>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </Message>
                </Form.Group>
            </Grid.Column>
        </Grid>
    );
};

export default reduxForm({ form: 'user' })(LoginForm);
