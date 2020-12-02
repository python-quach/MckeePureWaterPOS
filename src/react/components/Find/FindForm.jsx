import React, { useState } from 'react';
import { Divider, Form } from 'semantic-ui-react';
import Field from './FindField';
import FindModalButton from './FindModal';

function FindForm({
    clearForm,
    hideLogoutButton,
    handleSubmit,
    size,
    clearFields,
    closeMe,
    disableFindButton,
    history,
}) {
    const [hideField, setHideField] = useState(false);

    return (
        <Form onSubmit={handleSubmit} size={size}>
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
            <FindModalButton
                handleSubmit={handleSubmit}
                disable={disableFindButton}
                hideLogoutButton={hideLogoutButton}
                hideField={setHideField}
                clearForm={clearForm}
                closeMe={closeMe}
            />
        </Form>
    );
}

export default FindForm;
