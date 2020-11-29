import React from 'react';
import { Form } from 'semantic-ui-react';
import FindButton from './FindButton';

function FindForm(props) {
    const {
        iconColor,
        clearInvalidLoginButton,
        errorMessage,
        phone,
        account,
        firstName,
        lastName,
        focusInput,
        submitSucceeded,
        handleSubmit,
        size,
    };
    return (
        <Form onSubmit={handleSubmit} size={size}>
            <FindButton
                errorMessage={errorMessage}
                phone={phone}
                account={account}
            />
        </Form>
    );
}

export default FindForm;
