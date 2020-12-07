import React from 'react';
import { Button } from 'semantic-ui-react';

const AccountPortal = (props) => {
    return (
        <div>
            Account Portal
            <Button
                onClick={() => {
                    props.history.push('/find');
                }}>
                Back
            </Button>
        </div>
    );
};

export default AccountPortal;
