import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Field } from 'redux-form';

const CustomPhoneInput = (props) => (
    <PhoneInput
        {...props.input}
        specialLabel={'Phone'}
        disableCountryCode={true}
        disableDropdown={true}
        onlyCountries={['us']}
        defaultMask={'(...)-...-....'}
        alwaysDefaultMask={true}
        placeholder={'(408)-123-4567'}
        country={'us'}
    />
);

const Phone = ({ clear, clearMembershipError, error }) => {
    const handlePhoneClear = () => {
        if (error) clearMembershipError();
    };

    // This will clear the phone field if we enter data on other field
    const handleClearOtherFields = () => {
        clear(true, false, 'membership', 'firstName', 'lastName');
    };

    // Make sure only number are all allow
    const handleNumberMatch = (value) => {
        const numberPattern = /\d+/g;
        if (value.match(numberPattern)) {
            return value.match(numberPattern).join('');
        }
    };

    return (
        <Field
            className='PhoneNumber'
            name='phone'
            component={CustomPhoneInput}
            normalize={handleNumberMatch}
            onChange={clear ? handleClearOtherFields : null}
            onFocus={handlePhoneClear}
        />
    );
};

export default Phone;
