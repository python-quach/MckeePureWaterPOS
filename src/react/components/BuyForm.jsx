import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { BuyInput, Input } from './BuyInput';

const BuyForm = (props) => {
    return (
        <Form size='massive'>
            <Form.Group>
                <Form.Input
                    inverted
                    transparent={true}
                    placeholder='First Name'
                    width={3}
                    defaultValue='Hung Quach'
                />
                <Form.Input
                    transparent={true}
                    placeholder='Last Name'
                    width={3}
                />
                <Form.Input
                    transparent={true}
                    placeholder='Member Since'
                    width={3}
                />
                <Form.Input hidden width={3} transparent={true} />
                <Field
                    name='account'
                    component={Input}
                    config={{
                        className: 'BuyAccount',
                        label: 'Account',
                        placeholder: '000000',
                        inverted: true,
                        icon: 'hashtag',
                        iconPosition: 'left',
                        width: 2,
                    }}
                    normalize={(value, preValue) => {
                        console.log(value);
                        if (value.length < 5) {
                            return value;
                        } else {
                            return preValue;
                        }
                    }}
                />
                <Field
                    name='record'
                    component={Input}
                    config={{
                        className: 'BuyRecord',
                        label: 'Record',
                        inverted: true,
                        icon: 'hashtag',
                        iconPosition: 'left',
                        placeholder: '00000',
                        width: 2,
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input type='hidden' placeholder='2 Wide' width={12} />
                <Form.Input
                    color='primary'
                    icon='cart'
                    position='left'
                    iconPosition='left'
                    placeholder={0}
                    // size='huge'
                    width={2}
                    defaultValue={20}
                />
                <Form.Input
                    icon='cart'
                    position='left'
                    iconPosition='left'
                    placeholder={0}
                    // size='huge'
                    width={2}
                    defaultValue={20}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input placeholder='8 Wide' width={8} />
                <Form.Input placeholder='6 Wide' width={6} />
                <Form.Input placeholder='2 Wide' width={2} />
            </Form.Group>
        </Form>
    );
};

export default reduxForm({ form: 'buy' })(BuyForm);
