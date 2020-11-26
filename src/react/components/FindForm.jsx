import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Form,
    Grid,
    Input,
    Button,
    Message,
    Icon,
    Divider,
    Container,
    Step,
} from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import MemberModalButton from './FindMemberModal';
import BuyModalButton from './BuyModal';
import Proptype from 'prop-types';

const FindForm = (props) => {
    const {
        handleSubmit,
        findForm: { submitSucceeded },
        phone,
        membership,
        firstName,
        lastName,
        clearForm,
        phoneProps,
        history,
    } = props;
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = (values) => {
        console.log('LoginForm was submitted', { values });
    };

    const clearErrorMessage = () => {
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                {/* <Form.Group inline>
                    <Input
                        inverted
                        action={{
                            size: 'massive',
                            color: 'blue',
                            labelPosition: 'right',
                            icon: 'search',
                            content: 'Find',
                        }}
                        label={{
                            pointing: 'right',
                            color: 'white',
                        }}
                        size='massive'
                        actionPosition='right'
                        placeholder='Search...'
                        // defaultValue='52.03'
                    />
                    <Input
                        inverted
                        action={{
                            size: 'massive',
                            color: 'blue',
                            labelPosition: 'right',
                            icon: 'search',
                            content: 'Find',
                        }}
                        label={{
                            pointing: 'right',
                            color: 'white',
                        }}
                        size='massive'
                        actionPosition='right'
                        placeholder='Search...'
                        // defaultValue='52.03'
                    />
                </Form.Group> */}

                {/* <Button.Group size='massive'>
                    <Button
                        size='large'
                        color='blue'
                        content='Find'
                        // icon='fork'
                        icon='search'
                        label={{
                            // as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'right',
                            // content: '50',
                        }}
                    />
                    <Button
                        size='large'
                        color='vk'
                        content='Add'
                        // icon='fork'
                        icon='flask'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'right',
                            content: '50',
                        }}
                    />
                    <Button>Two</Button>
                    <Button.Or />
                    <Button>Three</Button>
                </Button.Group> */}
                <Form onSubmit={handleSubmit(loginUser)} size='large'>
                    <Field {...phoneProps} onFocus={clearErrorMessage} />
                    <Field
                        component={Form.Input}
                        name='membership'
                        placeholder='xxxxxxx'
                        focus
                        size='massive'
                        type='text'
                        fluid
                        icon='address card'
                        iconPosition='left'
                        transparent
                        inverted
                        onFocus={() => setErrorMessage('')}
                    />

                    <Field
                        component={Form.Input}
                        name='firstName'
                        placeholder='First Name'
                        focus
                        size='massive'
                        type='text'
                        fluid
                        icon='id badge'
                        iconPosition='left'
                        transparent
                        inverted
                        onFocus={() => setErrorMessage('')}
                    />
                    <Field
                        component={Form.Input}
                        name='lastName'
                        placeholder='Last Name'
                        focus
                        size='massive'
                        type='text'
                        fluid
                        icon='id badge'
                        iconPosition='left'
                        transparent
                        inverted
                        onFocus={() => setErrorMessage('')}
                    />
                    <MemberModalButton />
                    {/* <BuyModalButton /> */}
                    <Form.Button
                        circular
                        fluid
                        size='massive'
                        color='blue'
                        content='Logout'
                        icon='sign-out'
                        labelPosition='right'
                        onClick={(event, data) => {
                            event.preventDefault();
                            history.push('/');
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
                                {
                                    phone,
                                    membership,
                                    firstName,
                                    lastName,
                                    submitSucceeded,
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

FindForm.defaultProps = {
    phoneProps: {
        className: 'findPhoneField',
        component: Form.Input,
        name: 'phone',
        type: 'tel',
        placeholder: '(408)-123-4567',
        focus: true,
        size: 'massive',
        fluid: true,
        icon: 'phone',
        iconPosition: 'left',
        transparent: true,
        inverted: true,
    },
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('find');
    return {
        phone: selectFormData(state, 'phone'),
        membership: selectFormData(state, 'membership'),
        firstName: selectFormData(state, 'firstName'),
        lastName: selectFormData(state, 'lastName'),
        findForm: state.form.find
            ? {
                  values: state.form.find.values,
                  submitSucceeded: state.form.find.submitSucceeded,
              }
            : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => dispatch(reset('find')),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: 'find' })(FindForm));
