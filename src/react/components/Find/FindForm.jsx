import React, { useState } from 'react';
import { Divider, Form } from 'semantic-ui-react';
import Field from './FindField';
import FindModal from './FindModal';
// import FindMemberShipButton from './FindMembershipButton';

function FindForm({
    clearForm,
    hideLogoutButton,
    handleSubmit,
    size,
    clearFields,
    closeMe,
}) {
    const [hideField, setHideField] = useState(false);
    // const [openMemberModal, setOpenMemberModal] = useState(false);

    return (
        <Form onSubmit={handleSubmit} size={size}>
            <Field.Phone hide={hideField} clearFields={clearFields} />
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
            {/* <FindMemberShipButton setOpenModal={setOpenMemberModal} /> */}
            <FindModal
                // open={openMemberModal}
                hideLogoutButton={hideLogoutButton}
                hideField={setHideField}
                clearForm={clearForm}
                closeMe={closeMe}
            />
        </Form>
    );
}

export default FindForm;
