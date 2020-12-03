import React, { useState } from 'react';
import {
    Divider,
    Form,
    Button,
    TransitionablePortal,
    Segment,
    Header,
} from 'semantic-ui-react';
import Field from './FindField';
import FindModalButton from './FindModal';

function FindForm({
    setOpenFind,
    clearForm,
    hideLogoutButton,
    handleSubmit,
    size,
    clearFields,
    closeMe,
    disableFindButton,
    history,
    find,
    membership,
}) {
    const [hideField, setHideField] = useState(false);

    return (
        // <Form onSubmit={handleSubmit} size={size}>
        <Form
            size={size}
            onSubmit={handleSubmit((values) => {
                // console.log(values);
                find(values, (data) => {
                    if (!data.error) {
                        // setOpenPortal(true);
                        // setHideField(true);
                        history.push('/portal');
                    }
                    // console.log({ data });
                });
            })}>
            <Field.Phone
                hide={hideField}
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
                clearFields={() => {
                    clearFields(true, false, 'firstName', 'lastName', 'phone');
                }}
            />
            <Field.Name
                id='firstName'
                name='firstName'
                placeholder='first name'
                hide={hideField}
                clearFields={() => {
                    clearFields(true, false, 'account', 'phone');
                }}
            />
            <Field.Name
                id='lastName'
                name='lastName'
                placeholder='last name'
                hide={hideField}
                clearField={() => {
                    clearFields(true, false, 'account', 'phone');
                }}
            />
            <Divider hidden />
            {/* <Form.Button
                content='member'
                onClick={() => {
                    history.push('/member');
                }}
            /> */}
            <Form.Button
                size='massive'
                circular
                content='Open Portal'
                icon='facebook'
                fluid
                labelPosition='right'
            />

            {/* <FindModalButton
                history={history}
                membership={membership}
                handleSubmit={handleSubmit}
                disable={disableFindButton}
                hideLogoutButton={hideLogoutButton}
                hideField={setHideField}
                clearForm={clearForm}
                closeMe={closeMe}
                find={find}
            /> */}
        </Form>
    );
}

export default FindForm;
