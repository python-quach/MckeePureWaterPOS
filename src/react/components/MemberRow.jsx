import React from 'react';
import { List, Button, Modal, Icon, Form, Divider } from 'semantic-ui-react';
import BuyModalButton from './BuyModal';

const MemberRow = (props) => {
    const [firstOpen, setFirstOpen] = React.useState(false);
    const [secondOpen, setSecondOpen] = React.useState(false);

    return (
        // <List divided verticalAlign='middle' size='huge' inverted>
        <List verticalAlign='middle' size='huge' inverted>
            <List.Item>
                <List.Content floated='right'>
                    {/* <Button
                        // focus
                        size='large'
                        color='pink'
                        content='Buy'
                        labelPosition='right'
                        icon='plus cart'
                        onClick={() => {
                            setFirstOpen(true);
                            props.hideModel(true);
                        }}
                    /> */}
                    <Modal
                        closeOnDimmerClick={false}
                        closeOnEscape={false}
                        basic
                        style={{ marginLeft: '40px' }}
                        size='fullscreen'
                        dimmer='blurring'
                        onClose={() => setFirstOpen(false)}
                        onOpen={() => setFirstOpen(true)}
                        open={firstOpen}>
                        <Modal.Header>Buy Form Modal</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group>
                                    <Form.Input
                                        inverted
                                        transparent={true}
                                        placeholder='First Name'
                                        size='huge'
                                        width={3}
                                        defaultValue='Hung Quach'
                                    />
                                    <Form.Input
                                        transparent={true}
                                        placeholder='Last Name'
                                        size='huge'
                                        width={3}
                                    />
                                    <Form.Input
                                        transparent={true}
                                        placeholder='Member Since'
                                        size='huge'
                                        width={3}
                                    />
                                    <Form.Input
                                        hidden
                                        width={4}
                                        transparent={true}></Form.Input>
                                    <Form.Input
                                        inverted
                                        transparent={true}
                                        iconPosition='left'
                                        placeholder='account'
                                        size='huge'
                                        defaultValue='#12201'
                                        width={2}
                                    />
                                    <Form.Input
                                        inverted
                                        // icon='user'
                                        // inverted={true}
                                        transparent={true}
                                        iconPosition='left'
                                        // inverted={true}
                                        placeholder='record'
                                        size='huge'
                                        width={2}
                                        defaultValue='#102390'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        type='hidden'
                                        placeholder='2 Wide'
                                        width={12}
                                    />
                                    <Form.Input
                                        color='primary'
                                        icon='cart'
                                        position='left'
                                        iconPosition='left'
                                        placeholder='12 Wide'
                                        size='huge'
                                        // inverted
                                        width={2}
                                        // transparent={true}
                                        defaultValue={20}
                                    />
                                    <Form.Input
                                        icon='cart'
                                        position='left'
                                        iconPosition='left'
                                        placeholder='12 Wide'
                                        size='huge'
                                        width={2}
                                        defaultValue={20}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        placeholder='8 Wide'
                                        width={8}
                                    />
                                    <Form.Input
                                        placeholder='6 Wide'
                                        width={6}
                                    />
                                    <Form.Input
                                        placeholder='2 Wide'
                                        width={2}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => setSecondOpen(true)} primary>
                                Proceed <Icon name='right chevron' />
                            </Button>
                            <Button
                                onClick={() => {
                                    setFirstOpen(false);
                                    props.hideModel(false);
                                }}
                                secondary>
                                Done <Icon name='right chevron' />
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    {/* <BuyModalButton closeRow={props.closeMemberRow} /> */}
                    {!props.hide ? (
                        <>
                            <Button
                                // focus
                                size='large'
                                color='pink'
                                content='Buy'
                                labelPosition='right'
                                icon='plus cart'
                                onClick={() => {
                                    setFirstOpen(true);
                                    props.hideModel(true);
                                }}
                            />
                            <Button
                                // focus
                                size='large'
                                color='facebook'
                                content='Renew'
                                labelPosition='right'
                                icon='redo'
                            />
                            <Button
                                // focus
                                size='large'
                                color='twitter'
                                content='Edit'
                                labelPosition='right'
                                icon='edit'
                            />
                            <Button
                                // focus
                                size='large'
                                color='grey'
                                content='Invoice'
                                labelPosition='right'
                                icon='sticky note'
                            />
                        </>
                    ) : null}
                    {/* <Button
                        // focus
                        size='large'
                        color='facebook'
                        content='Renew'
                        labelPosition='right'
                        icon='redo'
                    />
                    <Button
                        // focus
                        size='large'
                        color='twitter'
                        content='Edit'
                        labelPosition='right'
                        icon='edit'
                    />
                    <Button
                        // focus
                        size='large'
                        color='grey'
                        content='Invoice'
                        labelPosition='right'
                        icon='sticky note'
                    /> */}
                </List.Content>
                <List.Content>
                    {!props.hide ? (
                        <>
                            {' '}
                            <Button
                                size='large'
                                color='grey'
                                content='302039'
                                icon='gg'
                                label={{
                                    basic: false,
                                    color: 'grey',
                                    pointing: 'right',
                                    // corner: 'left',
                                    // content: '200',
                                }}
                            />
                            <Button
                                size='large'
                                color='red'
                                content='Hung Quach'
                                icon='random'
                                label={{
                                    basic: false,
                                    color: 'red',
                                    pointing: 'right',
                                    // content: '200',
                                }}
                            />
                            <Button
                                size='large'
                                color='blue'
                                content='Gallon Remaining'
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
                        </>
                    ) : null}
                    {/* <Button
                        size='large'
                        color='grey'
                        content='302039'
                        icon='gg'
                        label={{
                            basic: false,
                            color: 'grey',
                            pointing: 'right',
                            // corner: 'left',
                            // content: '200',
                        }}
                    />
                    <Button
                        size='large'
                        color='red'
                        content='Hung Quach'
                        icon='random'
                        label={{
                            basic: false,
                            color: 'red',
                            pointing: 'right',
                            // content: '200',
                        }}
                    />
                    <Button
                        size='large'
                        color='blue'
                        content='Gallon Remaining'
                        // icon='fork'
                        icon='flask'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'right',
                            content: '50',
                        }}
                    /> */}
                </List.Content>
            </List.Item>
        </List>
    );
};

export default MemberRow;
