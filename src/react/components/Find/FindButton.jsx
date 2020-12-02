import React from 'react';
import { Form, Transition, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FindButton = (props) => {
    return (
        <Transition.Group>
            <Divider hidden />
            {!props.errorMessage ? (
                <Form.Button
                    {...props.findButton}
                    onClick={() => {
                        console.log('Find Membership Button Click');
                    }}
                />
            ) : (
                <Transition
                    {...props.transitionProps}
                    visible={!props.submitSucceeded}>
                    <Form.Button
                        {...props.errorButton}
                        onClick={(event) => event.preventDefault()}
                    />
                </Transition>
            )}
        </Transition.Group>
    );
};

FindButton.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    focusInput: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
};

FindButton.defaultProps = {
    findButton: {
        className: 'LogoutButton',
        circular: true,
        fluid: true,
        size: 'massive',
        id: 'FindButton',
        icon: 'search',
        labelPosition: 'right',
        content: 'Find Membership',
    },
    errorButton: {
        circular: true,
        fluid: true,
        size: 'massive',
        id: 'LoginButton',
        color: 'red',
        icon: 'warning sign',
        labelPosition: 'right',
        content: 'Unable to Find Membership',
    },
    transitionProps: {
        animation: 'shake',
        duration: 500,
        unmountOnHide: true,
    },
};

export default FindButton;
