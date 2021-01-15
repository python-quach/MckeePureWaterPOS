import React, { useState, useEffect } from 'react';
import { Divider, Form } from 'semantic-ui-react';
import Field from './FindField';
// import FindFormButton from './FindFormButton';

function FindForm({
    handleSubmit,
    size,
    clearFields,
    history,
    find,
    membership,
    account,
    phone,
    firstName,
    lastName,
    clearMembership,
    getAccount,
}) {
    const [hideField, setHideField] = useState(false);

    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    useEffect(() => {
        if (membership.error) {
            // console.log(membership.field);

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
                    if (data.memberships) history.push('/member');
                    if (data.membership) {
                        // console.log(data.membership);
                        getAccount(data.membership[0].account, () => {
                            history.push('/account');
                        });
                    }
                });
            })}>
            <Field.Phone
                setHideField={setHideField}
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

            {!membership.error ? (
                <Form.Button
                    disabled={!phone && !account && !firstName && !lastName}
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
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                />
            )}
        </Form>
    );
}

export default FindForm;
