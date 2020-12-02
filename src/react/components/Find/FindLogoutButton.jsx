import React from 'react';
import { Button } from 'semantic-ui-react';

function FindLogoutButton(props) {
    return (
        <>
            {!props.hide ? (
                <Button
                    {...props.logoutButton}
                    color='red'
                    onClick={() => {
                        props.logout();
                    }}
                />
            ) : null}
        </>
        // <Button
        //     {...props.logoutButton}
        //     color='red'
        //     onClick={() => {
        //         props.logout();
        //     }}
        // />
    );
}

FindLogoutButton.defaultProps = {
    logoutButton: {
        // className: 'LogoutButton',
        // color: 'red',
        secondary: true,
        circular: true,
        fluid: true,
        size: 'massive',
        id: 'LogoutButton',
        icon: 'sign-out',
        labelPosition: 'right',
        content: 'Logout',
    },
};

export default FindLogoutButton;
