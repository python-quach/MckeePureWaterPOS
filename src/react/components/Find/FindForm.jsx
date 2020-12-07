import React, { useState, useEffect } from 'react';
import { Divider, Form, Transition } from 'semantic-ui-react';
import Field from './FindField';
import FindFormButton from './FindFormButton';

function FindForm({
    handleSubmit,
    size,
    clearFields,
    history,
    find,
    membership,
    clearMembership,
    submitSucceeded,
}) {
    const [hideField, setHideField] = useState(false);

    useEffect(() => {
        if (membership.error) {
            console.log(membership.field);
            // if (membership.field) {
            // document.getElementById('phone').focus();
            if (membership.field) {
                document.getElementById(membership.field).focus();
            } else {
                document.getElementById('firstName').focus();
            }
        }
    }, [membership]);

    return (
        <Form
            size={size}
            onSubmit={handleSubmit((values) => {
                find(values, (data) => {
                    // if (!data.error) history.push('/member');
                    if (data.memberships) history.push('/member');
                    if (data.membership) history.push('/account');
                    // if (!data.error && data.memberships)
                    //     history.push('/member');
                    // if (!data.error && data.membership)
                    //     history.push('/account');
                });
            })}>
            <Field.Phone
                hide={hideField}
                clearMembership={clearMembership}
                error={membership.error}
                clearFields={() => {
                    clearFields(
                        true,
                        false,
                        'account',
                        'firstName',
                        'lastName'
                    );
                }}
            />
            <Field.Account
                hide={hideField}
                clearMembership={clearMembership}
                error={membership.error}
                clearFields={() => {
                    clearFields(true, false, 'firstName', 'lastName', 'phone');
                }}
            />
            <Field.Name
                id='firstName'
                name='firstName'
                placeholder='first name'
                clearMembership={clearMembership}
                error={membership.error}
                hide={hideField}
                clearFields={() => {
                    clearFields(true, false, 'account', 'phone');
                }}
            />
            <Field.Name
                id='lastName'
                name='lastName'
                clearMembership={clearMembership}
                error={membership.error}
                placeholder='last name'
                hide={hideField}
                clearField={() => {
                    clearFields(true, false, 'account', 'phone');
                }}
            />
            <Divider hidden />
            {/* <FindFormButton
                membership={membership}
                submitSucceeded={submitSucceeded}
            /> */}
            {!membership.error ? (
                <Form.Button
                    color='blue'
                    size='massive'
                    circular
                    content='Find Membership'
                    icon='search'
                    fluid
                    labelPosition='right'
                />
            ) : (
                <Form.Button
                    color='red'
                    size='massive'
                    circular
                    content='Unable to Find Membership'
                    icon='search'
                    fluid
                    labelPosition='right'
                />
            )}

            {/* <Transition.Group>
                {!membership.error ? (
                    <Form.Button
                        color='blue'
                        size='massive'
                        circular
                        content='Find Membership'
                        icon='search'
                        fluid
                        labelPosition='right'
                    />
                ) : (
                    <Transition
                        visible={!submitSucceeded}
                        animation='fade'
                        duration={500}
                        unmountOnHide={true}>
                        <Form.Button
                            color='red'
                            size='massive'
                            circular
                            content='Unable to Find Membership'
                            icon='search'
                            fluid
                            labelPosition='right'
                            onClick={(event) => event.preventDefault()}
                        />
                    </Transition>
                )}
            </Transition.Group> */}
            {/* <Form.Button
                color='blue'
                size='massive'
                circular
                content='Find Membership'
                icon='search'
                fluid
                labelPosition='right'
            /> */}
        </Form>
    );
}

export default FindForm;
