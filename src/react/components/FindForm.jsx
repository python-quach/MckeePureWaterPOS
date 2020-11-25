import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Form,
    Label,
    Grid,
    Message,
    Header,
    Icon,
    Modal,
    Button,
    Search,
    Divider,
    List,
    Segment,
} from 'semantic-ui-react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

const SegmentExamplePlaceholderGrid = () => (
    <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                    <Form size='large'>
                        <Field
                            component={Form.Input}
                            name='phone'
                            type='tel'
                            placeholder='(408)-123-4567'
                            focus
                            size='massive'
                            fluid
                            icon='phone'
                            iconPosition='left'
                            transparent
                            inverted
                        />

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
                        />
                        {/* <Form.Button
                        fluid
                        icon='search'
                        size='massive'
                        id='LoginButton'
                        color='teal'
                        content='Find Membership'
                        onClick={(event, data) => {
                            document.getElementById('LoginButton').focus();
                        }}
                    /> */}

                        <ModalExampleModal></ModalExampleModal>

                        <Form.Button
                            fluid
                            size='massive'
                            id='LoginButton'
                            color='grey'
                            content='Logout'
                            onClick={(event, data) => {
                                // document.getElementById('LoginButton').focus();
                            }}
                        />
                    </Form>
                </Grid.Column>

                <Grid.Column>
                    <Header icon>
                        <Icon name='world' />
                        Add New Country
                    </Header>
                    <Button primary>Create</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
);

const FormExampleWidthField = () => (
    <Form>
        <Form.Group>
            <Form.Input label='First name' placeholder='First Name' width={6} />
            <Form.Input
                label='Middle Name'
                placeholder='Middle Name'
                width={4}
            />
            <Form.Input label='Last Name' placeholder='Last Name' width={6} />
        </Form.Group>
        <Form.Group>
            <Form.Input placeholder='2 Wide' width={2} />
            <Form.Input placeholder='12 Wide' width={12} />
            <Form.Input placeholder='2 Wide' width={2} />
        </Form.Group>
        <Form.Group>
            <Form.Input placeholder='8 Wide' width={8} />
            <Form.Input placeholder='6 Wide' width={6} />
            <Form.Input placeholder='2 Wide' width={2} />
        </Form.Group>
    </Form>
);

function ModalExampleModal() {
    const [open, setOpen] = React.useState(false);

    return (
        <Modal
            basic
            // size='large'
            size='fullscreen'
            dimmer='blurring'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Form.Button
                    fluid
                    size='massive'
                    icon='search'
                    id='LoginButton'
                    color='teal'
                    content='Find Membership'
                    onClick={(event, data) => {
                        document.getElementById('LoginButton').focus();
                    }}
                />
            }>
            <Modal.Header>Select a Member</Modal.Header>
            <Modal.Content>
                {/* <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                        We've found the following gravatar image associated with
                        your e-mail address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                </Modal.Description> */}
                {/* <FormExampleWidthField /> */}
                {/* <ListExampleInverted /> */}
                <ListExampleFloated />
            </Modal.Content>
            <Modal.Actions>
                <Button color='pink' onClick={() => setOpen(false)}>
                    Nope
                </Button>
                <Button
                    content="Yep, that's me"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    color='teal'
                    // positive
                />
            </Modal.Actions>
        </Modal>
    );
}

const ListExampleInverted = () => (
    <Segment inverted color='blue'>
        <List divided inverted relaxed color='blue'>
            <List.Item>
                <List.Content>
                    <List.Header>Snickerdoodle</List.Header>
                    An excellent companion
                </List.Content>
            </List.Item>
            <List.Item>
                <List.Content>
                    <List.Header>Poodle</List.Header>A poodle, its pretty basic
                </List.Content>
            </List.Item>
            <List.Item>
                <List.Content>
                    <List.Header>Paulo</List.Header>
                    He's also a dog
                </List.Content>
            </List.Item>
        </List>
    </Segment>
);

const ListExampleFloated = () => (
    // <List animated divided verticalAlign='middle' size='massive' inverted>
    <List divided verticalAlign='middle' size='massive' inverted>
        <List.Item>
            <List.Content floated='right'>
                <Button size='huge' color='youtube'>
                    Buy
                </Button>
                <Button size='huge' color='facebook'>
                    Renew
                </Button>
                <Button size='huge' color='twitter'>
                    Invoice
                </Button>
            </List.Content>
            <List.Content>
                <Button
                    size='huge'
                    color='grey'
                    // inverted
                    content='302039'
                    icon='toolbar'
                    label={{
                        basic: true,
                        color: 'grey',
                        pointing: 'right',
                        content: '200',
                    }}
                />
                <Button
                    size='huge'
                    color='red'
                    // inverted
                    content='Hung Quach'
                    icon='heart'
                    label={{
                        basic: true,
                        color: 'red',
                        pointing: 'right',
                        content: '200',
                    }}
                />
                <Button
                    size='huge'
                    // basic
                    color='blue'
                    content='Gallon Remaining'
                    icon='fork'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'blue',
                        pointing: 'right',
                        content: '2,048',
                    }}
                />
            </List.Content>
        </List.Item>

        {/* <List.Item>
            <List.Content floated='right'>
                <Button color='youtube'>Buy</Button>
                <Button color='facebook'>Renew</Button>
                <Button color='twitter'>Invoice</Button>
            </List.Content>
            <List.Content>
                <Button
                    color='red'
                    // inverted
                    content='Linsey'
                    icon='heart'
                    label={{
                        basic: true,
                        color: 'red',
                        pointing: 'left',
                        content: '200',
                    }}
                />
                <Button
                    // basic
                    color='blue'
                    content='Gallon Remaining'
                    icon='fork'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'blue',
                        pointing: 'left',
                        content: '2,048',
                    }}
                />
            </List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <Button color='youtube'>Buy</Button>
                <Button color='facebook'>Renew</Button>
                <Button color='twitter'>Invoice</Button>
            </List.Content>
            <List.Content>
                <Button
                    color='red'
                    // inverted
                    content='Tuyet'
                    icon='heart'
                    label={{
                        basic: true,
                        color: 'red',
                        pointing: 'left',
                        content: '200',
                    }}
                />
                <Button
                    // basic
                    color='blue'
                    content='Gallon Remaining'
                    icon='fork'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'blue',
                        pointing: 'left',
                        content: '2,048',
                    }}
                />
            </List.Content>
        </List.Item> */}
    </List>
);

const FindForm = (props) => {
    const {
        handleSubmit,
        findForm: { submitSucceeded },
        phone,
        membership,
        firstName,
        lastName,
        clearForm,
        history,
    } = props;
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //     if (submitSucceeded) {
    //         console.log(phone, membership, firstName, lastName);
    //         ipcRenderer.send(channels.APP_INFO, { phone, membership });
    //         ipcRenderer.on(channels.APP_INFO, (event, response) => {
    //             ipcRenderer.removeAllListeners(channels.APP_INFO);

    //             const { auth } = response;
    //             if (!auth) {
    //                 console.log({ response });
    //                 clearForm();
    //                 setErrorMessage(response.error);
    //             } else {
    //                 console.log({ response });
    //                 clearForm();
    //                 history.push('/dashboard');
    //             }
    //         });
    //     }
    // }, [
    //     submitSucceeded,
    //     phone,
    //     membership,
    //     firstName,
    //     lastName,
    //     clearForm,
    //     history,
    // ]);

    const loginUser = (values) => {
        console.log('LoginForm was submitted', { values });
    };

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            {/* <Grid.Column style={{ maxWidth: 450 }}> */}
            <Grid.Column style={{ maxWidth: 450 }}>
                {/* <SegmentExamplePlaceholderGrid /> */}
                <Form onSubmit={handleSubmit(loginUser)} size='large'>
                    <Field
                        component={Form.Input}
                        name='phone'
                        type='tel'
                        placeholder='(408)-123-4567'
                        focus
                        size='massive'
                        fluid
                        icon='phone'
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
                    {/* <Form.Button
                        fluid
                        icon='search'
                        size='massive'
                        id='LoginButton'
                        color='teal'
                        content='Find Membership'
                        onClick={(event, data) => {
                            document.getElementById('LoginButton').focus();
                        }}
                    /> */}

                    <ModalExampleModal></ModalExampleModal>

                    <Form.Button
                        fluid
                        size='massive'
                        id='LoginButton'
                        color='grey'
                        content='Logout'
                        onClick={(event, data) => {
                            event.preventDefault();
                            props.history.push('/');
                            // document.getElementById('LoginButton').focus();
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
